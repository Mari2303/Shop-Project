import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const ProductList = () => {
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState(null); 

    const visibleProducts = 5; 
    const productWidth = 220; 

    useEffect(() => {
        if (category) {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

    useEffect(() => {
        const buttons = document.querySelectorAll('.banner-button');
        
        const handleFilterClick = (event) => {
            const selectedCategory = event.target.getAttribute('data-category');
            setCategory(selectedCategory);
            setCurrentIndex(0); 
        };

        buttons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener('click', handleFilterClick);
            });
        };
    }, []);

    const handleNext = () => {
        if (currentIndex < filteredProducts.length - visibleProducts) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="product-carousel">
            {/* Carrusel de productos */}
            <button className="carousel-button" onClick={handlePrevious} disabled={currentIndex === 0}>
                &lt;
            </button>
            <div className="product-list-container">
                <div
                    className="product-list"
                    style={{ transform: `translateX(-${currentIndex * productWidth}px)` }}
                >
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product">
                            <img src={product.image} alt={product.title} />
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-button" onClick={handleNext} disabled={currentIndex >= filteredProducts.length - visibleProducts}>
                &gt;
            </button>
        </div>
    );
};

export default ProductList;
