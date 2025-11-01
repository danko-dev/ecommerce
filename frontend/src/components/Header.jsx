import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const { count } = useCart();
  const { user, logout } = useUser();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #0f172a 0%, #111827 50%, #0b1020 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "#00e5ff",
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          NovaTech
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/account">Hi, {user.name}</Button>
              <Button color="inherit" size="small" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/auth">Sign In</Button>
          )}
          <IconButton color="inherit" onClick={() => setOpenCart(true)}>
            <Badge color="secondary" badgeContent={count} overlap="circular">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
      </Toolbar>
    </AppBar>
  );
}
