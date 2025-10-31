import { useState } from "react";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function Auth() {
  const { login, signup } = useUser();
  const [tab, setTab] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setMessage("Logged in");
    } catch {
      setMessage("Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      await signup(name, email, password);
      setMessage("Signed up");
    } catch {
      setMessage("Signup failed");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 480, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>
        Account
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      {tab === 0 ? (
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
        </Box>
      )}
      {message && (
        <Typography sx={{ mt: 2 }} color="#9ca3af">{message}</Typography>
      )}
    </Box>
  );
}


