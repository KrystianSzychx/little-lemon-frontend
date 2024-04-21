import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pages from '../../../utils/pages';
import { fetchImages } from './ImageService';
import './Hero.css';

const Hero = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchHeroImage = async () => {
            try {
                const urls = await fetchImages(['restaurant-food.jpg']);
                setImageUrl(urls[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHeroImage();
    }, []);

    return (
        <section className='hero'>
            <div className='container grid'>
                <div className='hero-information'>
                <h1 data-testid="cypress-title">Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                 We are a family owned Mediterranean restaurant, 
                 focused on traditional recipes served with a modern twist.
                </p>
                <Link className='button-primary' to={pages.get('bookings').path}>
                    Reserve a table
                </Link>
                </div>
                <img
                className='hero-image'
                src={imageUrl}
                alt='Restaurant food'/>
            </div>
        </section>
    );
};

export default Hero;