import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './WeekSpecials.css';
import pages from '../../../utils/pages';
import MealCard from './MealCard';
import { fetchImages } from './ImageService';

const meals = [
  {
    name: 'Greek Salad',
    imageName: 'greek-salad.jpg',
    price: '$12.99',
    description: `The famous greek salad of crispy lettuce, peppers, olives and 
      our Chicago style feta cheese, garnished with crunchy garlic and rosemary 
      croutons.`,
  },
  {
    name: 'Bruschetta',
    imageName: 'bruschetta.jpg',
    price: '$5.99',
    description: `Our Bruschetta is made from grilled bread that has been 
      smeared with garlic and seasoned with salt and olive oil.`,
  },
  {
    name: 'Lemon Dessert',
    imageName: 'lemon-dessert.jpg',
    price: '$5.00',
    description: `This comes straight from grandma's recipe book, every last 
      ingredient has been sourced and is as authentic as can be imagined.`,
  },
];

const WeekSpecials = () => {
  const [mealImages, setMealImages] = useState([]);

  useEffect(() => {
    const fetchMealImages = async () => {
      try {
        const imageUrls = await fetchImages(meals.map(meal => meal.imageName));
        setMealImages(imageUrls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchMealImages();
  }, []);

  return (
    <section className="container grid week-specials">
      <div className="week-specials-header">
        <h2>This week specials!</h2>
        <Link className="button-primary" to={pages.get('orderOnline').path}>
          Online Menu
        </Link>
      </div>
      {meals.map((meal, index) => (
        <MealCard key={index} meal={meal} imageUrl={mealImages[index]} />
      ))}
    </section>
  );
};

export default WeekSpecials;
