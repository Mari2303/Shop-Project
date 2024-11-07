// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';

const AppRouter = () => (
    <Router>
        <div className="app-container">
            <Navbar />
            <div className="main-content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/products" component={Products} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>
);

export default AppRouter;