import React from "react";
import ProductList from "./components/productList/productList"; 
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="App">
            <h1>Shope-store</h1>
            <ProductList />
        </div>
    );
};

export default App;

