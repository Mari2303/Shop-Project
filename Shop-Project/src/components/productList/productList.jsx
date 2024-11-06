import React, { useState } from 'react';  
import useFetch from '../../hooks/useFetch';  
import ProductDetails from '../ProductDetails/ProductDetails';
const ProductList = () => {  
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');  
    const [currentIndex, setCurrentIndex] = useState(0);  
    const [selectedProductId, setSelectedProductId] = useState(null); 
    const visibleProducts = 5; // Cantidad de productos visibles a la vez  
    const productWidth = 220; // Ancho de cada producto, ajusta según sea necesario  

    if (loading) return <p>Cargando...</p>;  
    if (error) return <p>Error: {error.message}</p>;  

    const handleNext = () => {  
        if (currentIndex < products.length - visibleProducts) {  
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

    return (  
        <div className="product-carousel">  
            <button className="carousel-button" onClick={handlePrevious} disabled={currentIndex === 0}>  
                Anterior  
            </button>  
            <div className="product-list-container">  
                <div  
                    className="product-list"  
                    style={{ transform: `translateX(-${currentIndex * productWidth}px)` }}  
                >  
                    {products.map(product => (  
                        <div key={product.id} className="product" onClick={() => openModal(product.id)}>  
                            <img src={product.image} alt={product.title} />  
                            <h2>{product.title}</h2>  
                            <p>Price: ${product.price}</p>  
                        </div>  
                    ))}  
                </div>  
            </div>  
            <button className="carousel-button" onClick={handleNext} disabled={currentIndex >= products.length - visibleProducts}>  
                Siguiente  
            </button>  

            {selectedProductId && (  
                <ProductDetails isOpen={!!selectedProductId} onClose={closeModal} productId={selectedProductId} />  
            )}  
        </div>  
    );  
};  

export default ProductList;