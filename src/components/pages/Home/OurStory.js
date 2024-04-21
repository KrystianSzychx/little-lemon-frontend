import React, { useState, useEffect } from 'react';
import './OurStory.css';
import { fetchImages } from './ImageService';

const OurStory = () => {
    const [chefImages, setChefImages] = useState([]);

    useEffect(() => {
        const fetchChefImages = async () => {
            try {
                const imageUrls = await fetchImages([
                    'chefs-mario-and-adrian_a.jpg',
                    'chefs-mario-and-adrian_b.jpg'
                ]);
                setChefImages(imageUrls);
            } catch (error) {
                console.error('Error fetching chef images:', error);
            }
        };

        fetchChefImages();
    }, []);

    return (
        <section className='container grid our-story'>
            <div className='our-story-description'>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum. Sed ut 
                perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
                inventore veritatis et quasi architecto beatae vitae dicta sunt 
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
                odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                voluptatem sequi nesciunt.
                </p>
            </div>
            <div className='our-story-chefs'>
                {chefImages.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Chefs Mario and Adrian ${index + 1}`} />
                ))}
            </div>
        </section>
    );
};

export default OurStory;