import React, { useState } from 'react';
import './AddMeal.css';

const AddMeal = ({ onAddMeal }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newMeal = {
            id: 0, // This will be set by the backend
            name,
            type,
            price: parseFloat(price),
        };

        try {
            const response = await fetch('https://littlelemonwebapi.azurewebsites.net/api/Meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMeal)
            });

            if (response.ok) {
                // const data = await response.json();
                // onAddMeal(data);
                setName('');
                setType('');
                setPrice('');
                setSuccessMessage('Meal added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
            } else {
                console.error('Failed to add meal');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-meal management">
            <h2>Add a New Meal</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <input
                        type="text"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Meal</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default AddMeal;
