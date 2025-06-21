import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
    const [full_name, setFullName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !login || !full_name || !phone_number || !address || !password) {
            alert('Одно из полей не заполнено');
        }

        if (!email.includes('@')) {
            alert('Email должен содержать символ @');
            return;
        }

        if (password.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ full_name, login, email, phone_number, address, password}),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registered successfully');
            navigate('/login');
        } else {
            alert(data.message || 'Register failed');
        }
    };

    return (
        <div className="registration-page">
            <title>Регистрация</title>
            <header className="navbar-registration">
                <Link to="/login" className="go-back-button">Назад</Link>
            </header>
            <div className="registration-form-wrapper">
                <h1>Регистрация:</h1>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="ФИО" 
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Логин" 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Пароль" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="tel" 
                            placeholder="Номер телефона" 
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Адрес магазина" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="submit-button">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;