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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, total, updateQty } = useCart();

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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
                <IconButton size="small" color="inherit" onClick={() => updateQty(p.id, Math.max(0, p.qty - 1))}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography>{p.qty}</Typography>
                <IconButton size="small" color="inherit" onClick={() => updateQty(p.id, p.qty + 1)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
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
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
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
