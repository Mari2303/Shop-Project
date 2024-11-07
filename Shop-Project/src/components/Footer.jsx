import React from 'react';
import '../assets/styles/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4>Acerca de nosotros</h4>
                    <ul>
                        <li>
                            <p>Avalon, diseñada para facilitar la búsqueda y compra<br /> de productos variados, como ropa, joyería y
                            electrónicos.<br /> En el sitio, los usuarios pueden explorar productos<br /> destacados en un diseño atractivo y
                            organizado,<br /> con acceso rápido a categorías específicas para <br />encontrar lo que necesitan fácilmente.</p>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Más Información</h4>
                    <ul>
                        <li><a href="tel:+3243652328">324 3652328</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Desarrolladores</h4>
                    <ul>
                        <li><a href="#">Ana Maria Blanco</a></li>
                        <li><a href="#">Maria Alejandra Marin</a></li>
                        <li><a href="#">Leidy Alejandra Hoyola</a></li>
                        <li><a href="#">Angelica Patricia Quintana</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
