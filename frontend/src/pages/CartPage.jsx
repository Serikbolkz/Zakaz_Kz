import './CartPage.css';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const [editingId, setEditingId] = useState(null);
    const [editedQty, setEditedQty] = useState(1);
    const [orderDate, setOrderDate] = useState("");

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditedQty(item.quantity);
    };

    const handleSaveClick = (item) => {
        updateQuantity(item.id, editedQty);
        setEditingId(null);
    };

    const handleOrderSubmit = async () => {
        if (!orderDate) {
            alert("Пожалуйста, выберите дату доставки.");
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        console.log("User in localStorage:", user);
        if (!user || !user.id) {
            alert("Пользователь не найден. Пожалуйста, войдите заново.");
            return;
        }

        const cartData = cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        try {
            const response = await axios.post('http://127.0.0.1:8000/place_order/', {
                user_id: user.id,
                order_date: orderDate,
                cart_items: cartData
            });

            alert("Заказ оформлен успешно!");
            clearCart();
            setOrderDate("");
        } catch (error) {
            console.error("Ошибка при оформлении заказа:", error);
            alert("Произошла ошибка при оформлении заказа.");
        }
    };

    return (
        <div className="cart-page">
            <header className="navbar-cart">
                <Link to="/products" className="go-to-products">Продукты</Link>
            </header>

            <div className="cart-content">
                <h2>Корзина</h2>

                {cartItems.length === 0 ? (
                    <p className="empty-cart-message">Корзина пуста</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <span>{item.name}</span>
                                    {editingId === item.id ? (
                                        <>
                                            <input
                                                type="number"
                                                value={editedQty}
                                                min="1"
                                                onChange={(e) => setEditedQty(parseInt(e.target.value))}
                                            />
                                            <button className="save-btn" onClick={() => handleSaveClick(item)}>Сохранить</button>
                                        </>
                                    ) : (
                                        <span>{item.quantity} шт.</span>
                                    )}
                                    <div className="cart-actions">
                                        {editingId !== item.id && (
                                            <button className="edit-btn" onClick={() => handleEditClick(item)}>Изменить</button>
                                        )}
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Удалить</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <p className="total-price">Общая сумма: {totalPrice} ₸</p>

                        <label className="order-date-label">Выберите дату доставки:</label>
                        <input
                            type="date"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                        />
                        <br />
                        <button className="order-btn" onClick={handleOrderSubmit}>Заказать</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
