import React, { useState, useEffect } from 'react';
import './UpdateMeal.css';

const UpdateMeal = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [updatedMeal, setUpdatedMeal] = useState({
        name: '',
        type: '',
        price: 0,
    });

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch('https://littlelemonwebapi.azurewebsites.net/api/Meals');
                const data = await response.json();
                setMeals(data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, []);

    const handleMealSelect = (meal) => {
        setSelectedMeal(meal);
        setUpdatedMeal(meal);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMeal({ ...updatedMeal, [name]: value });
    };

    const handleUpdateMeal = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://littlelemonwebapi.azurewebsites.net/api/Meals/${selectedMeal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMeal),
            });
            if (response.ok) {
                alert('Meal updated successfully!');
                setSelectedMeal(null);
                setUpdatedMeal({
                    name: '',
                    type: '',
                    price: 0,
                });
                const updatedMeals = meals.map(meal => meal.id === updatedMeal.id ? updatedMeal : meal);
                setMeals(updatedMeals);
            } else {
                alert('Failed to update meal.');
            }
        } catch (error) {
            console.error('Error updating meal:', error);
            alert('Error updating meal.');
        }
    };

    const handleDeleteMeal = async (mealId) => {
        try {
            const response = await fetch(`https://littlelemonwebapi.azurewebsites.net/api/Meals/${mealId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert('Meal deleted successfully!');
                setMeals(meals.filter(meal => meal.id !== mealId));
                if (selectedMeal && selectedMeal.id === mealId) {
                    setSelectedMeal(null);
                    setUpdatedMeal({
                        name: '',
                        type: '',
                        price: 0,
                    });
                }
            } else {
                alert('Failed to delete meal.');
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
            alert('Error deleting meal.');
        }
    };

    return (
        <div>
            <h2>Update Meal</h2>
            <div>
                <h3>Select a Meal to Update</h3>
                <ul className="meal-list">
                    {meals.map(meal => (
                        <li key={meal.id} className="meal-item" onClick={() => handleMealSelect(meal)}>
                            <span>{meal.name}</span>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMeal(meal.id);
                            }}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedMeal && (
                <div className="form-meals">
                    <form onSubmit={handleUpdateMeal}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={updatedMeal.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Type:
                            <input
                                type="text"
                                name="type"
                                value={updatedMeal.type}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={updatedMeal.price}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="submit">Update Meal</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateMeal;
