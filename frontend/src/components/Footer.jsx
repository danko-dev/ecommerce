import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        textAlign: "center",
        py: 4,
        mt: 8,
      }}
    >
      <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
        © {new Date().getFullYear()} NovaTech — Built with ❤️ using React &
        Material UI
      </Typography>
    </Box>
  );
}
