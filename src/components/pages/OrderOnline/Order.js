import React, { useState, useEffect } from 'react';
import './Order.css';
import MealCard from "../Home/MealCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartPage from '../CartPage/CartPage';
import { fetchImages } from '../Home/ImageService';

const Order = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showCartPage, setShowCartPage] = useState(false); 
    const [mostFrequentMeal, setMostFrequentMeal] = useState(null);
    const [mealImages, setMealImages] = useState([]);
    const [meals, setMeals] = useState([]);

    const handleAddToCart = (meal) => {
        console.log(`Dodano ${meal.name} do koszyka.`);
        const existingItemIndex = cartItems.findIndex(item => item.name === meal.name);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            const newCartItems = [...cartItems, { ...meal, quantity: 1 }];
            setCartItems(newCartItems);
        }
        setCartCount(cartCount + 1);
    };

    const handleShowCartPage = () => {
        setShowCartPage(true);
    };

    const handleUpdateQuantity = (itemName, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.name === itemName) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    useEffect(() => {
        const fetchMostFrequentMeal = async () => {
            try {
                const response = await fetch('https://littlelemonwebapi.azurewebsites.net/api/Meals/most-popular');
                const data = await response.json();
                setMostFrequentMeal(data);
            } catch (error) {
                console.error('Error fetching most frequent meal:', error);
            }
        };

        const fetchMeals = async () => {
            try {
                const response = await fetch('https://littlelemonwebapi.azurewebsites.net/api/Meals');
                const data = await response.json();

                // Ensure price is a string
                const mealsWithPriceAsString = data.map(meal => ({
                    ...meal,
                    price: meal.price.toString(),
                }));

                setMeals(mealsWithPriceAsString);

                // const imageUrls = await fetchImages(meals.map(meal => meal.imageName));
                // setMealImages(imageUrls);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        }

        fetchMostFrequentMeal();
        fetchMeals();
    }, []);

    return (
        <div className="orders">
            {!showCartPage ? (
                <>
                    <h2>This week specials!</h2>
                    {mostFrequentMeal && (
                        <div className="most-frequent-meal">
                            <h3>Most Frequently Ordered Meal: {mostFrequentMeal.meals}</h3>
                            <p>Ordered {mostFrequentMeal.count} times</p>
                        </div>
                    )}
                    <section className="container grid week-specials">
                        {meals.map((meal, index) =>
                            <MealCard key={index} meal={meal} imageUrl={mealImages[index]} displayAddToCart={true} handleAddToCart={() => handleAddToCart(meal)} />
                        )}
                    </section>
                    <div className="cart-icon" onClick={handleShowCartPage}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="cart-count">{cartCount}</span>
                    </div>
                </>
            ) : (
                <CartPage cartItems={cartItems} updateQuantity={handleUpdateQuantity} />
            )}
        </div>
    );
}

export default Order;
