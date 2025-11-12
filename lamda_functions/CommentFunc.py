import os, json, uuid, base64
from decimal import Decimal
from time import gmtime, strftime

import boto3
from botocore.exceptions import ClientError

# --- Config ---
REGION           = os.environ.get("AWS_REGION", "us-east-2")
TABLE_NAME       = os.environ.get("TABLE_NAME", "ComMap")
PLACE_INDEX_NAME = os.environ.get("PLACE_INDEX_NAME", "TestPlaceIndex")
BIAS_LON         = float(os.environ.get("BIAS_LON", "-75.480858"))
BIAS_LAT         = float(os.environ.get("BIAS_LAT", "40.632950"))

# --- Clients ---
ddb = boto3.resource("dynamodb", region_name=REGION).Table(TABLE_NAME)
loc = boto3.client("location", region_name=REGION)

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def resp(status, obj):
    return {"statusCode": status, "headers": {"Content-Type": "application/json", **CORS}, "body": json.dumps(obj)}

def lambda_handler(event, _):
    # OPTIONS preflight
    method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    # Parse JSON body (supports base64-encoded from API Gateway)
    body = event.get("body")
    if body is None:
        return resp(400, {"error": "missing body"})
    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8")

    try:
        data = json.loads(body)
    except Exception:
        return resp(400, {"error": "invalid json"})

    name    = (data.get("name") or "").strip()
    address = (data.get("address") or "").strip()
    comment = (data.get("comment") or "").strip()
    if not address:
        return resp(400, {"error": "address is required"})

    # Geocode
    try:
        r = loc.search_place_index_for_text(
            IndexName=PLACE_INDEX_NAME, Text=address, MaxResults=1, BiasPosition=[BIAS_LON, BIAS_LAT]
        )
        results = r.get("Results") or []
        if not results:
            return resp(404, {"error": "address not found"})
        lon, lat = results[0]["Place"]["Geometry"]["Point"]  # [lon, lat]
        lon, lat = Decimal(str(lon)), Decimal(str(lat))       # DynamoDB requires Decimal
    except ClientError as e:
        return resp(502, {"error": f"geocode failed: {e.response['Error']['Message']}"})
    except Exception as e:
        return resp(502, {"error": f"geocode failed: {e}"})

    # Write
    item_id = str(uuid.uuid4())
    created = strftime("%Y-%m-%dT%H:%M:%SZ", gmtime())
    try:
        ddb.put_item(
            Item={
                "ID": item_id,
                "createAt": created,
                "name": name,
                "address": address,
                "lat": lat,
                "long": lon,
                "comment": comment,
            },
            ConditionExpression="attribute_not_exists(ID) AND attribute_not_exists(createAt)",
        )
    except ClientError as e:
        msg = e.response.get("Error", {}).get("Message", "dynamodb error")
        code = 400 if "ConditionalCheckFailedException" in msg else 500
        return resp(code, {"error": f"dynamodb put_item failed: {msg}"})

    return resp(200, {"message": "Saved", "id": item_id, "createAt": created, "lat": float(lat), "long": float(lon)})
