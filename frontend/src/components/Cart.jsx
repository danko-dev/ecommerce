import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div
      style={{ padding: "1rem", backgroundColor: "#121212", color: "white" }}
    >
      <Typography variant="h5">Shopping Cart</Typography>
      <List>
        {cart.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            }
          >
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">
        Total: ${cart.reduce((sum, item) => sum + item.price, 0)}
      </Typography>
    </div>
  );
}
