import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import ProductDetails from '../ProductDetails/ProductDetails';
import '../../assets/styles/allProducts.css';

const AllProducts = () => {
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null); 

    const visibleProducts = 5;

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
        const buttons = document.querySelectorAll('.filter-button');
        
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
        <div className="responsive-product-container">
            <div className="responsive-product-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="responsive-product-item">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <div className="product-details">
                            <h2>{product.title}</h2>
                            <p>Precio: ${product.price}</p>
                            {/* Botón Comprar */}
                            <button
                                className="buy-button"
                                onClick={() => openModal(product.id)}
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProductId && (
                <ProductDetails 
                    isOpen={!!selectedProductId} 
                    onClose={closeModal} 
                    productId={selectedProductId} 
                />
            )}
        </div>
    );
};

export default AllProducts;