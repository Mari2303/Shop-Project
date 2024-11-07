import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import "../assets/styles/cart.css"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Almacenará los productos completos con sus detalles
  const [total, setTotal] = useState(0); // Total del carrito
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products'); // Llamar a la API para obtener productos

  useEffect(() => {
    console.log(localStorage.getItem('cart'));
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener los datos del carrito desde localStorage

    if (storedCart.length > 0 && products.length > 0) {
      // Mapear los productos del carrito con los datos obtenidos de la API
      const completeCartItems = storedCart.map(cartItem => {
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
      setCartItems(completeCartItems); // Establecer los productos completos en el estado
      calculateTotal(completeCartItems); // Calcular el total
    }
  }, [products]); // Solo se ejecuta cuando los productos cambian

  // Función para calcular el total del carrito
  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(totalAmount.toFixed(2)); // Formatear el total a dos decimales
  };

  // Eliminar producto del carrito
  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Guardar los cambios en localStorage
    calculateTotal(updatedItems);
  };

  // Incrementar la cantidad de un producto
  const handleIncrement = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Actualizar localStorage
    calculateTotal(updatedItems);
  };

  // Decrementar la cantidad de un producto
  const handleDecrement = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Actualizar localStorage
    calculateTotal(updatedItems);
  };

  // Manejar el cambio en el campo de cantidad
  const handleQuantityChange = (e, id) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty > 0) {
      const updatedItems = cartItems.map(item => {
        if (item.id === id) {
          return { ...item, qty: newQty };
        }
        return item;
      });
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems)); // Actualizar localStorage
      calculateTotal(updatedItems);
    }
  };

  // Mostrar el resumen del carrito
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
        <div className="cart-total">
          <p><strong>Total:</strong> ${total}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
