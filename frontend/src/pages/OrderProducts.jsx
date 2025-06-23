import React, { useState, useEffect } from 'react';
import './OrderProducts.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const initialProducts = [
  { id: 1, name: 'Manty', price: 1790, image: '/foods/manti.jpg' },
  { id: 2, name: 'Roast Chicken', price: 1890, image: '/foods/chicken.jpg' },
  { id: 3, name: 'Lagman', price: 1690, image: '/foods/lagman.jpg' },
  { id: 4, name: 'Plov', price: 1790, image: '/foods/plov.jpg' },
  { id: 5, name: 'Beshbarmak', price: 2190, image: '/foods/besh.jpg' },
  { id: 6, name: 'Samsa', price: 450, image: '/foods/samsa.jpeg' }
];

const OrderProducts = ({ user, setUser }) => {
    const { cartItems, setQuantity } = useCart();
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach(item => {
        initialQuantities[item.id] = item.quantity;
        });
        setQuantities(initialQuantities);
    }, [cartItems]);

    const handleSetQuantity = (product) => {
        const qty = quantities[product.id] || 0;
        setQuantity(product, qty);
    };

    const updateQuantity = (id, delta) => {
        setQuantities(prev => {
        const newQty = Math.max((prev[id] || 0) + delta, 0);
        return { ...prev, [id]: newQty };
        });
    };
    const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="order-products-page">
        <header className="navbar-products">
            <Link to="/" className="go-back-button">Назад</Link>
            <Link to="/cart" className="cart-icon">
                <FaShoppingCart size={22} />
                {totalItemsInCart > 0 && (
                    <span className="cart-count">{totalItemsInCart}</span>
                )}
            </Link>
        </header>

        <div className="products-list">
            <h2>Продукты которые вы можете заказать:</h2>
            <div className="products-list-picture">
            {initialProducts.map(product => (
                <div key={product.id} className="product-list-item">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.price} Тенге</p>
                <div className="quantity-control">
                    <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                    <span>{quantities[product.id] || 0}</span>
                    <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                </div>

                <button
                    className="add-to-cart-button"
                    onClick={() => handleSetQuantity(product)}
                >
                    Добавить в корзину
                </button>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default OrderProducts;

