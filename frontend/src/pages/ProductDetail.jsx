import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Rating, Typography, Stack } from "@mui/material";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((r) => r.json())
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="#9ca3af">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "100%", borderRadius: 12, objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://picsum.photos/seed/${product.id}/1000/700`;
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography color="#9ca3af">{product.rating.toFixed(1)}</Typography>
          </Box>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography color="#9ca3af" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button variant="contained" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const url = window.location.href;
                const text = `Check this out: ${product.name} - $${product.price.toFixed(2)}\n${url}`;
                if (navigator.share) {
                  navigator.share({ title: product.name, text, url }).catch(() => {});
                } else {
                  window.open(`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(text)}`);
                }
              }}
            >
              Share
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const url = window.location.href;
                const text = `Check this out: ${product.name} - $${product.price.toFixed(2)} ${url}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
              }}
            >
              WhatsApp
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}


