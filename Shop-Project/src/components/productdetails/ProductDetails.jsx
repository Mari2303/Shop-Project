import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slice';
import './ProductDetails.css';
import useFetch from '../../hooks/useFetch';

const ProductDetails = ({ isOpen, onClose, productId }) => {
  const { data: productDetails, loading, error } = useFetch(
    productId ? `https://fakestoreapi.com/products/${productId}` : null
  );
  
  const [isAnimating, setIsAnimating] = useState(false);
  const productImageRef = useRef(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    if (productDetails) {
      dispatch(addToCart({ id: productDetails.id, qty: 1 }));
      
      // Activar la animación
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // Resetear la animación después de 1 segundo
      
      // Cerrar el modal después de agregar al carrito
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error.message}</p>}
        {productDetails && (
          <div className="product-details">
            <h3>{productDetails.title}</h3>
            <div className="product-info">
              <img
                ref={productImageRef}
                src={productDetails.image}
                alt={productDetails.title}
                className={`product-image ${isAnimating ? 'move-to-cart' : ''}`}
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
