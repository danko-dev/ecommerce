import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 350,
          p: 3,
          backgroundColor: "#1e1e1e",
          color: "#fff",
          height: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2, borderColor: "#333" }} />
        {cart.length === 0 ? (
          <Typography>No items yet.</Typography>
        ) : (
          cart.map((p) => (
            <Box key={p.id} sx={{ mb: 2 }}>
              <Typography>{p.name}</Typography>
              <Typography variant="body2" color="#aaa">
                ${p.price} × {p.qty}
              </Typography>
              <Button
                size="small"
                color="error"
                onClick={() => removeFromCart(p.id)}
              >
                Remove
              </Button>
              <Divider sx={{ my: 1, borderColor: "#333" }} />
            </Box>
          ))
        )}
        <Box mt="auto">
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#00bcd4", color: "#000" }}
          >
            Checkout
          </Button>
          <Button fullWidth color="error" sx={{ mt: 1 }} onClick={clearCart}>
            Clear Cart
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
