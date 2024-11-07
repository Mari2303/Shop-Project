import React from "react";
import ProductList from "./productList/productList";

const Home = () => {

    const handleCategoryClick = (category) => {
        // Aquí puedes agregar la lógica para manejar el clic en las categorías
        console.log(`Categoría seleccionada: ${category}`);
        // Puedes redirigir a la página de esa categoría, si lo deseas
    };

    return (
        <>
            <div className="banner">
                <div className="banner-content">
                    <h3 className="banner-subtitle">EASY</h3>
                    <h1 className="banner-title">AVALON</h1>
                    <p className="banner-description">FÁCIL DE ENCONTRAR LO QUE NECESITAS</p>
                    <div className="banner-buttons">
                        <button 
                            className="banner-button" 
                            data-category="men's clothing" 
                            onClick={() => handleCategoryClick("men's clothing")}
                        >
                            Men
                        </button>
                        <button 
                            className="banner-button" 
                            data-category="women's clothing" 
                            onClick={() => handleCategoryClick("women's clothing")}
                        >
                            Women
                        </button>
                        <button 
                            className="banner-button" 
                            data-category="jewelery" 
                            onClick={() => handleCategoryClick("jewelery")}
                        >
                            Jewelry
                        </button>
                        <button 
                            className="banner-button" 
                            data-category="electronics" 
                            onClick={() => handleCategoryClick("electronics")}
                        >
                            Electronics
                        </button>
                    </div>
                </div>
            </div>

            <ProductList />
        </>
    );
};

export default Home;
