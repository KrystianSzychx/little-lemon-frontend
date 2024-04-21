import React from 'react';
import './CartPage.css'; // Zaimportuj plik stylów dla CartPage


const CartPage = ({ cartItems, updateQuantity }) => {
    // Funkcja do obliczania łącznej ceny
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + parseFloat(item.price.replace('$', '')) * item.quantity;
        }, 0);
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
        </div>
    );
}

export default CartPage;
