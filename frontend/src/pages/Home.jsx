import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        height: "80vh",
        background:
          "url('https://source.unsplash.com/1600x900/?tech,gadgets') center/cover no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "white", textShadow: "2px 2px 8px black" }}
      >
        Welcome to My Shop
      </Typography>
    </Box>
  );
}
