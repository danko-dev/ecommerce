import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.id}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
