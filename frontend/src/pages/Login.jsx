import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setUser }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!login || !password) {
            alert('Пожалуйста, введите логин и пароль');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user || { login }));
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }

                if (setUser) setUser(data.user || { login });
                navigate('/');
            } else {
                alert(data.message || 'Ошибка входа');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Ошибка при подключении к серверу');
        }
    };

    return (
        <div className="login-page">
            <title>Авторизация</title>
            <header className="navbar-login">
                <Link to="/" className="go-back-button">Назад</Link>
            </header>
            <div className="form">
                <h1>Авторизоваться:</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Логин" 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper password-wrapper">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Пароль" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            type="button" 
                            className="toggle-password" 
                            onClick={() => setShowPassword(!showPassword)} 
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="submit-button">Войти</button>
                        <Link to="/registration" className="submit-button link-button">Регистрация</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
