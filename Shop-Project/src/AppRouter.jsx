// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/productList/Navbar';
import Home from './components/home';
import Cart from './components/cart';
import Footer from './components/Footer';
import AllProducts from './components/productList/allProducts';

const AppRouter = () => (
    <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            <Footer />
    </Router>
);

export default AppRouter;