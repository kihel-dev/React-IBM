import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice'; // Ensure the correct path to CartSlice

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [addedToCart, setAddedToCart] = useState({}); // State to track added products

    const dispatch = useDispatch();

    const plantsArray = [
        // ... [Your plantsArray as provided]
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Corrected typo from 'alignIems'
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Show the cart when cart icon is clicked
        setShowPlants(false); // Hide plants if needed
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Show plants
        setShowCart(false); // Hide the cart when navigating to Plants
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the addItem action
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true, // Mark the product as added to cart
        }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img 
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" 
                            alt="Eco Icon" 
                            style={{ width: '50px', height: '50px' }}
                        />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={handlePlantsClick} style={styleA}>
                            Plants
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h1 className='cart'>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 256 256" 
                                    id="IconChangeColor" 
                                    height="68" 
                                    width="68"
                                >
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path 
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" 
                                        fill="none" 
                                        stroke="#faf9f9" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        id="mainIconPathAttribute"
                                    ></path>
                                </svg>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img 
                                            className="product-image" 
                                            src={plant.image} 
                                            alt={plant.name} 
                                        />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button 
                                            className="product-button" 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
