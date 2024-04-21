import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { fetchImages } from './ImageService';
import TestimonialCard from './TestimonialCard';

const customers = [
  {
    fullName: 'Maria Sanchez',
    imageName: 'customer1.jpg',
    rating: [1, 1, 1, 1, 0.5],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    fullName: 'Antony Clifton',
    imageName: 'customer2.jpg',
    rating: [1, 1, 1, 1, 1],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    fullName: 'Tamika Jackson',
    imageName: 'customer3.jpg',
    rating: [1, 1, 1, 1, 0.5],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    fullName: 'Brandon Ming',
    imageName: 'customer4.jpg',
    rating: [1, 1, 1, 1],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
];


const Testimonials = () => {
  const [customerImages, setCustomerImages] = useState([]);

  useEffect(() => {
    const fetchCustomerImages = async () => {
      try {
        const imageUrls = await fetchImages(customers.map(customer => customer.imageName));
        setCustomerImages(imageUrls);
      } catch (error) {
        console.error('Error fetching customer images:', error);
      }
    };

    fetchCustomerImages();
  }, []);

    return (
        <section className='testimonials'>
          <div className='container grid'>
            <h2>What people say about us!</h2>
            {customers.map((customer, index) => 
                <TestimonialCard 
                key={index} 
                customer={{ ...customer, image: customerImages[index] }}
                />
                )}
          </div>
        </section>
    );
};

export default Testimonials;