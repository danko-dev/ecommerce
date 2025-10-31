import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Navigate to="/" replace />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
