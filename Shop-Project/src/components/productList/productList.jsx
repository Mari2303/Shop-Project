import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const ProductList = () => {
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleProducts = 5; // Cantidad de productos visibles a la vez
    const productWidth = 220; // Ancho de cada producto, ajusta según sea necesario

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleNext = () => {
        if (currentIndex < products.length - visibleProducts) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <div className="product-carousel">
            <button className="carousel-button" onClick={handlePrevious} disabled={currentIndex === 0}>
                
            </button>
            <div className="product-list-container">
                <div
                    className="product-list"
                    style={{ transform: `translateX(-${currentIndex * productWidth}px)` }}
                >
                    {products.map(product => (
                        <div key={product.id} className="product">
                            <img src={product.image} alt={product.title} />
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-button" onClick={handleNext} disabled={currentIndex >= products.length - visibleProducts}>
                
            </button>
        </div>
    );
};

export default ProductList;

                      

