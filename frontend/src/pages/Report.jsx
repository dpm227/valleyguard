import { Navbar } from "../components/Navbar";
import { Stack, TextField, Button } from "@mui/material";
import logo from "../assets/images/logo.png";
import { Send, Check } from "lucide-react";
import { useState } from "react";

export default function Report() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const makeReport = () => {
    const newReport = {
      name: name,
      address: address,
      comment: comment,
    };

    fetch("https://7qown26ud8.execute-api.us-east-2.amazonaws.com/dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReport),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    });
    handleClear();
  };

  const handleClear = () => {
    setTimeout(() => {
      setName("");
      setAddress("");
      setComment("");
    }, 500);
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="mx-auto w-full max-w-md p-6">
        <Stack spacing={5} sx={{ width: "100%", maxWidth: 420 }}>
          {" "}
          <img src={logo} alt="logo"></img>
          <TextField
            id="name"
            required
            label="Your Full Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            id="address"
            required
            label="Address of Incident"
            variant="outlined"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            id="incident"
            required
            label="Incident Report"
            variant="outlined"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button
            loadingPosition="start"
            variant="outlined"
            onClick={makeReport}
            startIcon={<Send />}
          >
            Submit Report
          </Button>
        </Stack>
      </div>
    </div>
  );
}
