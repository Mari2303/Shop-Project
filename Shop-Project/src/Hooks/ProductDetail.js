import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Obtener el ID del producto de la URL

    return (
        <div>
            <h1>Detalles del Producto {id}</h1>
            {/* Aquí agregarás la lógica para mostrar los detalles del producto */}
        </div>
    );
};

export default ProductDetail;
