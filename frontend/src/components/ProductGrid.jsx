import React from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import products from "../data/products";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <Grid key={p.id} item xs={12} sm={6} md={4}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
