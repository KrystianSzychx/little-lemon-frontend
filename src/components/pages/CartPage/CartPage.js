import React, { useState } from 'react';
import './CartPage.css'; // Zaimportuj plik stylów dla CartPage

const CartPage = ({ cartItems, updateQuantity }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');

    // Funkcja do obliczania łącznej ceny
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + parseFloat(item.price.replace('$', '')) * item.quantity;
        }, 0);
    };

    // Funkcja do obsługi zamówienia
    const handleOrder = async () => {
        const orderData = {
            id: 0,
            total: calculateTotalPrice(),
            meals: cartItems.map((item, index) => ({
                id: index,
                name: item.name,
                type: "meal", // Assuming type is "meal", update as needed
                price: parseFloat(item.price.replace('$', ''))
            }))
        };

        try {
            const response = await fetch('https://littlelemonwebapi.azurewebsites.net/api/Orders', {
                method: 'POST',
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setOrderPlaced(true);
                setOrderMessage('Your order has been placed successfully!');
                console.log("Order placed:", orderData);
            } else {
                setOrderMessage('Failed to place order. Please try again.');
                console.error('Error placing order:', response.statusText);
            }
        } catch (error) {
            setOrderMessage('An error occurred while placing the order. Please try again.');
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <div className="quantity-container">
                            <button className="quantity-button" onClick={() => updateQuantity(item.name, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                            <p className="quantity">{item.quantity}</p>
                            <button className="quantity-button" onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
            <button className="order-button" onClick={handleOrder}>Order</button>
            {orderPlaced && <p className="order-message">{orderMessage}</p>}
        </div>
    );
}

export default CartPage;
