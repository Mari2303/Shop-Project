import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, updateCart, clearCart, decrementCart } from '../redux/slice';
import useFetch from '../hooks/useFetch';
import "../assets/styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (cart.length > 0 && products.length > 0) {
      const completeCartItems = cart.map(cartItem => {
        const product = products.find(item => item.id === cartItem.id);
        return {
          ...cartItem,
          title: product.title,
          description: product.description,
          image: product.image,
          rating: product.rating,
          price: product.price
        };
      });
      setCartItems(completeCartItems);
      calculateTotal(completeCartItems);
    }
  }, [cart, products]);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(totalAmount.toFixed(2));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleIncrement = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      dispatch(addToCart({ id, qty: item.qty + 1 }));
    }
  };

  const handleDecrement = (id) => {
    const item = cart.find((item) => item.id === id);
    dispatch(decrementCart({ id, qty: item.qty - 1 }));
  };

  const handleQuantityChange = (e, id) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty > 0) {
      dispatch(updateCart({ id, qty: newQty }));
    }
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    dispatch(clearCart());
    setCartItems([]);
    setTotal(0);
  };

  return (
    <div className="cart-summary">
      <h2>Resumen del Carrito</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>Error al cargar los productos.</p>
      ) : cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-summary-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-summary-item">
              <div className="item-details">
                <img src={item.image} alt={item.title} className="item-image" />
                <div>
                  <p className="item-name">{item.title}</p>
                  <p className="item-price">${item.price}</p>
                  <p className="item-total">Total: ${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                  min="1"
                  className="quantity-input"
                />
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <>
        <div className="cart-total">
          <p><strong>Total:</strong> ${total}</p>
        </div>
        <br />
        <button className="clear-cart-button" onClick={handleClearCart}>
          Vaciar Carrito
        </button>
        </>
      )}
    </div>
  );
};

export default Cart;
