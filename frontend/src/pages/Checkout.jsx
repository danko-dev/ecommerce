import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useUser();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id ?? null,
          items: cart.map((p) => ({ productId: p.id, qty: p.qty })),
        }),
      });
      const data = await res.json();
      setStatus(data);
      clearCart();
    } catch (e) {
      setStatus({ error: "Payment failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>
        Checkout
      </Typography>
      {cart.length === 0 && !status && (
        <Typography color="#9ca3af">Your cart is empty.</Typography>
      )}
      {cart.map((p) => (
        <Box key={p.id} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>
            {p.name} × {p.qty}
          </Typography>
          <Typography>${(p.price * p.qty).toFixed(2)}</Typography>
        </Box>
      ))}
      {cart.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </>
      )}
      {status && (
        <Box sx={{ mt: 3 }}>
          {status.error ? (
            <Typography color="error">{status.error}</Typography>
          ) : (
            <>
              <Typography variant="h6" color="#22c55e">
                Payment Successful
              </Typography>
              <Typography variant="body2" color="#9ca3af">
                Order ID: {status.orderId}
              </Typography>
              <Typography variant="body2" color="#9ca3af">
                Charged: ${status.chargedTotal.toFixed(2)} {status.currency}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}


