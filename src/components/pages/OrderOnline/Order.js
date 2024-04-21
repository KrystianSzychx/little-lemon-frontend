import React, { useState } from 'react';
import bruschettaImage from '../Home/assets/bruschetta.jpg';
import greekSaladImage from '../Home/assets/greek-salad.jpg';
import lemonDessertImage from '../Home/assets/lemon-dessert.jpg';
import './Order.css';
import MealCard from "../Home/MealCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartPage from '../CartPage/CartPage';

const meals = [
    {
        name: 'Greek Salad',
        image: greekSaladImage,
        price: '$12.99',
        description: `The famous greek salad of crispy lettuce, peppers, olives and 
        our Chicago style feta cheese, garnished with crunchy garlic and rosemary 
        croutons.`,
    },
    {
        name: 'Bruschetta',
        image: bruschettaImage,
        price: '$5.99',
        description: `Our Bruschetta is made from grilled bread that has been 
        smeared with garlic and seasoned with salt and olive oil.`,
    },
    {
        name: 'Lemon Dessert',
        image: lemonDessertImage,
        price: '$5.00',
        description: `This comes straight from grandma's recipe book, every last 
        ingredient has been sourced and is as authentic as can be imagined.`,
    },
];

const Order = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showCartPage, setShowCartPage] = useState(false); // Nowy stan do wyświetlenia strony koszyka

    const handleAddToCart = (meal) => {
        console.log(`Dodano ${meal.name} do koszyka.`);
        // Sprawdź, czy przedmiot już istnieje w koszyku
        const existingItemIndex = cartItems.findIndex(item => item.name === meal.name);
        if (existingItemIndex !== -1) {
            // Jeśli tak, zwiększ tylko ilość
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            // W przeciwnym razie dodaj nowy przedmiot do koszyka
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

    return (
        <div className="orders">
            {!showCartPage ? (
                <>
                    <h2>This week specials!</h2>
                    <section className="container grid week-specials">
                        {meals.map((meal, index) =>
                            <MealCard key={index} meal={meal} displayAddToCart={true} handleAddToCart={() => handleAddToCart(meal)} />
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
