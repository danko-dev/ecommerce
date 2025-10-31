import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <Typography variant="h4" style={{ color: "#fff", marginBottom: 20 }}>
        Shop
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#1f1f1f", color: "#fff" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>${product.price}</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </CardContent>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
