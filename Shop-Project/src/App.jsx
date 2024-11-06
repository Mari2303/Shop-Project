import React, { useState } from "react";
import ProductList from "./components/productList/productList"; 
import Cart from "./components/cart";

const App = () => {
    return (
        <div className="App">
            <h1>Shope-store</h1>
            <Cart />
        </div>

    )
    }
    

export default App;
