import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link para navegación interna

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/carrito">Carrito</Link>
        </nav>
    );
};

export default Navbar;

