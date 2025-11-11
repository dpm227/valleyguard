import { Navbar } from "../components/Navbar";
import { Stack, TextField, Button } from "@mui/material";
import logo from "../assets/images/logo.png";
import { Send } from "lucide-react";

export default function Report() {
  return (
    <div>
      <Navbar />
      <br />
      <div className="mx-auto w-full max-w-md p-6">
        <Stack spacing={5} sx={{ width: "100%", maxWidth: 420 }}>
          {" "}
          <img src={logo} alt="logo"></img>
          <TextField id="name" label="Your Full Name" variant="outlined" />
          <TextField
            id="address"
            label="Address of Incident"
            variant="outlined"
          />
          <TextField id="incident" label="Incident Report" variant="outlined" />
          <Button startIcon={<Send />}>Submit Report</Button>
        </Stack>
      </div>
    </div>
  );
}
