import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [openCart, setOpenCart] = React.useState(false);

  return (
    <AppBar position="sticky" sx={{ background: "#1e1e1e" }} elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: "#00bcd4", fontWeight: 600 }}
        >
          NovaTech
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Shop</Button>
          <Button color="inherit">Contact</Button>
          <IconButton color="inherit" onClick={() => setOpenCart(true)}>
            <ShoppingCartIcon />
          </IconButton>
          <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
