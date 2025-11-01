import { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function Account() {
  const { user, updateUser, changePassword, deleteUser, logout } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Please sign in to manage your account.</Typography>
      </Box>
    );
  }

  const handleSaveProfile = async () => {
    try {
      await updateUser({ name, email });
      setMsg("Profile updated.");
    } catch {
      setMsg("Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword(oldPassword, newPassword);
      setMsg("Password changed.");
      setOldPassword("");
      setNewPassword("");
    } catch {
      setMsg("Failed to change password.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      setMsg("Account deleted.");
    } catch {
      setMsg("Cannot delete account (existing orders?).");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 640, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Account</Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }} color="#9ca3af">ID: {user.id}</Typography>
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button variant="contained" onClick={handleSaveProfile}>Save Profile</Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField type="password" label="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <TextField type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <Button onClick={handleChangePassword}>Change Password</Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button color="error" onClick={handleDelete}>Delete Account</Button>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </Box>
      {msg && (
        <Typography sx={{ mt: 2 }} color="#9ca3af">{msg}</Typography>
      )}
    </Box>
  );
}



