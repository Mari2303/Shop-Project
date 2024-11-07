import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    if (cartItemCount > 0) {
      // Activa la animación
      setIsJumping(true);
      // Desactiva la animación después de 5 saltos (0.3s * 5)
      const timeout = setTimeout(() => setIsJumping(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [cartItemCount]);

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/products">Productos</Link>
      <Link to="/cart">
        <div className="cart-icon">
          <img src="../../img/cart.png" alt="cart" />
          {cartItemCount > 0 && (
            <span className={`cart-count ${isJumping ? 'jump' : ''}`}>
              {cartItemCount}
            </span>
          )}
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
