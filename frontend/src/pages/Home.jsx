import { Navbar } from "../components/Navbar";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Home() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const API_KEY =
    "v1.public.eyJqdGkiOiI3MjAwOGEwOC1lNGNjLTRkOTktYTE2NC03YzkzZTMyYzU2YmYifS21BHwITHXj9ZmZIXYe4uOoxZMh1DVbs8q6q6nYW_vZ2kWJI-iz0hw2osfDJeVU_N0yMdHYkg1nofnL13PHrRoVOholrfFbOTMZYUBfnii5Ni36nXWMqLK31KtR4WkNrHYokv0fmsmE3ORULysmH_5IMBX4cSeZrqbAWf9-zktNa8icuquuIA09c-33cEP6bmUWm8lKzkR1155TxWt7bhUJ4Pf8tibyJwsnQy7N37aqAmp104xa4uQqRPNb2p8-VKOUIW8J6IkDZPVg508nv-h2Z50y7jb8aVDtqPqFevD3SFXTFOSV7utZpnmIR-jUXzsdtK0vn66g56kNFi_Aw28.NjAyMWJkZWUtMGMyOS00NmRkLThjZTMtODEyOTkzZTUyMTBi";
  const STYLE = "Standard";
  const REGION = "us-east-2";
  const CENTER = [-75.3772, 40.6054];
  const ZOOM = 14;

  useEffect(() => {
    if (mapInstance.current) return; // prevent double init in strict mode

    // init map
    mapInstance.current = new maplibregl.Map({
      container: mapRef.current,
      style: `https://maps.geo.${REGION}.amazonaws.com/v2/styles/${STYLE}/descriptor?key=${API_KEY}`,
      center: CENTER,
      zoom: ZOOM,
    });

    mapInstance.current.addControl(
      new maplibregl.NavigationControl(),
      "top-left"
    );

    // add markers from Lambda/API
    fetch("https://s0ak2d9y28.execute-api.us-east-2.amazonaws.com/dev")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) return;

        data.forEach((item) => {
          const lng = item?.long;
          const lat = item?.lat;
          if (typeof lng !== "number" || typeof lat !== "number") return;

          const coords = [lng, lat];

          const popupHtml = `
            <div class="gradient-border bg-secondary text-foreground">
              <h6 class="m-1 mb-1 text-base font-semibold text-primary">
                ${item?.address ?? "Unknown Address"}
              </h6>
              <p class="m-0 text-sm">
                ${item?.comment ?? ""}
              </p>
            </div>
          `;

          const popup = new maplibregl.Popup({
            offset: 16,
            className: "tw-map-popup",
          })
            .setLngLat(coords)
            .setHTML(popupHtml);

          new maplibregl.Marker()
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(mapInstance.current);
        });
      })
      .catch((err) => console.error("Fetch error:", err));

    // cleanup on unmount
    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/** NavBar */}
      <Navbar />
      {/** Map Content */}
      <div ref={mapRef} className="flex-1 min-h-0 w-full" />
    </div>
  );
}
