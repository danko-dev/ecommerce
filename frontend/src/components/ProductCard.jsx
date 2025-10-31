import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card sx={{ backgroundColor: "#1E1E2F", color: "white" }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
