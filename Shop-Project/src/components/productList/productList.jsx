import React from 'react';
import useFetch from '../../hooks/useFetch';

const ProductList = () => {
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');

    if (loading) return <p>Cargando</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product">
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
