import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import ProductDetails from '../ProductDetails/ProductDetails';

const ProductList = () => {
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null); 

    const visibleProducts = 5; 
    const productWidth = 220;

    // Filtrado por categoría
    useEffect(() => {
        if (category) {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

    // Event listeners para los botones de filtrado
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

    const openModal = (productId) => {
        setSelectedProductId(productId); 
    };

    const closeModal = () => {
        setSelectedProductId(null); 
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="product-carousel">
            <button className="carousel-button" onClick={handlePrevious} disabled={currentIndex === 0}>
                Anterior
            </button>
            <div className="product-list-container">
                <div
                    className="product-list"
                    style={{ transform: `translateX(-${currentIndex * productWidth}px)` }}
                >
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product" onClick={() => openModal(product.id)}>
                            <img src={product.image} alt={product.title} />
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-button" onClick={handleNext} disabled={currentIndex >= filteredProducts.length - visibleProducts}>
                Siguiente
            </button>

            {selectedProductId && (
                <ProductDetails isOpen={!!selectedProductId} onClose={closeModal} productId={selectedProductId} />
            )}
        </div>
    );
};

export default ProductList;
