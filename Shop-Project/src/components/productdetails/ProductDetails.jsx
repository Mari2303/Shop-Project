import React from 'react';  
import './ProductDetails.css'; 
import useFetch from '../../hooks/useFetch';  

const ProductDetails = ({ isOpen, onClose, productId }) => {  
    const { data: productDetails, loading, error } = useFetch(  
        productId ? `https://fakestoreapi.com/products/${productId}` : null  
    );  

    if (!isOpen) return null;   

    const handleOverlayClick = (e) => {  
        if (e.target === e.currentTarget) {  
            onClose();   
        }  
    };

    const handleAddToCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = storedCart.find(item => item.id === productDetails.id);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            storedCart.push({ id: productDetails.id, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(storedCart));
        alert('Producto añadido al carrito');
    };

    return (  
        <div className="modal-overlay" onClick={handleOverlayClick}>  
            <div className="modal-content">  
                <button className="modal-close" onClick={onClose}>&times;</button>  
                {loading && <p>Cargando...</p>}  
                {error && <p>Error: {error.message}</p>}  
                {productDetails && (  
                    <div className="product-details">  
                        <h3>{productDetails.title}</h3>  
                        <div className="product-info">  
                            <img  
                                src={productDetails.image}  
                                alt={productDetails.title}  
                                className="product-image"  
                            />  
                            <div className="product-text">  
                                <p className="product-description">{productDetails.description}</p>  
                                <p className="product-price">Precio: ${productDetails.price}</p>  
                                <button className="add-to-cart-button" onClick={handleAddToCart}>
                                    🛒
                                </button>
                            </div>  
                        </div>  
                    </div>  
                )}  
            </div>  
        </div>  
    );  
};  

export default ProductDetails;
