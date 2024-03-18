import React from 'react';
import bruschettaImage from '../Home/assets/bruschetta.jpg';
import greekSaladImage from '../Home/assets/greek-salad.jpg';
import lemonDessertImage from '../Home/assets/lemon-dessert.jpg';
import './Order.css';
import MealCard from "../Home/MealCard";

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
    const handleAddToCart = (meal) => {
        console.log(`Dodano ${meal.name} do koszyka.`);
    };
    
    return (
        <div className="orders">
            <h2>This week specials!</h2>
            <section className="container grid week-specials">
                {meals.map((meal, index) =>
                    <MealCard key={index} meal={meal} displayAddToCart={true} handleAddToCart={handleAddToCart} />
                )}
            </section>
        </div>
    );
}

export default Order;
