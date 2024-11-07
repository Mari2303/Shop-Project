// Implementación de las dos APIs
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/productList/productList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Navbar from './componentes/Navbar'; // Asegúrate de que la ruta sea correcta

const AppRouter = () => (
  <Router>
    <Navbar /> {/* Mueve el Navbar fuera de las Routes para que aparezca en todas las páginas */}
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
);

export default AppRouter;