import React, { useEffect, useState, useContext } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Rating, Skeleton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: "#111827" }}>
                  <Skeleton variant="rectangular" height={200} />
                  <Box sx={{ p: 2 }}>
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                    <Skeleton width="90%" />
                  </Box>
                </Card>
              </Grid>
            ))
          : products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    backgroundColor: "#111827",
                    color: "#e5e7eb",
                    overflow: "hidden",
                    transition: "transform .2s ease, box-shadow .2s ease",
                    '&:hover': { transform: "translateY(-4px)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://picsum.photos/seed/${product.id}/800/600`;
                    }}
                  />
                  <CardContent>
                    <Typography
                      component={Link}
                      to={`/product/${product.id}`}
                      variant="h6"
                      sx={{ fontWeight: 700, textDecoration: "none", color: "inherit" }}
                    >
                      {product.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Rating value={product.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="#9ca3af">
                        {product.rating.toFixed(1)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 800, mb: 1 }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="#9ca3af">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product)}
                    sx={{ m: 2 }}
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
