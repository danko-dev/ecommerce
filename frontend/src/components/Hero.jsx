import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        height: { xs: 400, md: 500 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Discover Premium Tech Gear
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: "rgba(255,255,255,0.8)" }}>
          Hand-picked gadgets that combine style and performance.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#00bcd4",
            color: "#000",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#00acc1" },
          }}
        >
          Shop Now
        </Button>
      </Container>
    </Box>
  );
}
