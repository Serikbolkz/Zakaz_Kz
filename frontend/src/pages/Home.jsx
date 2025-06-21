import React from 'react';
import './Home.css';
import LogoScroller from '../components/LogoScroller';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        if (setUser) setUser(null);
        navigate('/');
    };
    
    return (
        <div className="home-container">
            <title>ZakazKz</title>
            {/* Navbar */}
            <header className="navbar">
                <div className="nav-left">
                    <a href="/">Логотип</a>
                </div>
                <div className="nav-center">
                    <a href="#home">Home</a>
                    <a href="#about">About Us</a>
                    <a href="#products">Products</a>
                    <a href="#benefits">Benefits</a>
                </div>
                <div className="nav-right">
                {user ? (
                    <div className="auth-info">
                        <span className="username">Привет, {user.login}!</span>
                        <button className="login-button" onClick= {handleLogout}>
                            Выйти
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="login-button">Войти</Link>
                )}
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="section hero">
                <div className="hero-container">
                    <h1>Добро пожаловать в нашу систему заказов!</h1>
                    <p>
                        Мы рады приветствовать владельцев магазинов и рынков. У нас вы найдёте широкий ассортимент свежих и качественных продуктов по доступным ценам. Быстрая доставка, прозрачные условия и индивидуальный подход — всё для вашего удобства и успешного бизнеса.
                    </p>
                    <p>
                        Начните заказывать прямо сейчас и убедитесь сами!
                    </p>
                </div>
            </section>

            {/* About Us */}
            <section id="about" className="section about">
                <h1>О нас</h1>
                    <p>
                            ZakazKz — это платформа, созданная специально для владельцев магазинов и рынков. 
                        Наша цель — упростить процесс заказа продуктов оптом, обеспечивая высокое качество, 
                        честные цены и оперативную доставку.
                    </p>
                    <p>
                            Мы команда разработчиков и логистов, которые стремятся автоматизировать закупки и сделать 
                        ваш бизнес более эффективным. С нами вы экономите время, минимизируете ошибки и 
                        получаете надёжного партнёра.
                    </p>
                    <p>
                        Доверьтесь нашему опыту и технологиям — мы позаботимся о всём.
                    </p>
                <h1>Наши Клиенты</h1>
                <LogoScroller />
            </section>

            {/* Features */}
            <section id="products" className="section products">
                <h2>Нами предоставляемые продукты</h2>
                <div className="products-picture">
                    <div className="product-item">
                        <img src="/foods/manti.jpg" alt="Manty" />
                        <p>Manty</p>
                    </div>
                    <div className="product-item">
                        <img src="/foods/chicken.jpg" alt="Chicken" />
                        <p>Roast Chicken</p>
                    </div>
                    <div className="product-item">
                        <img src="/foods/lagman.jpg" alt="Lagman" />
                        <p>Lagman</p>
                    </div>
                    <div className="product-item">
                        <img src="/foods/plov.jpg" alt="Plov" />
                        <p>Plov</p>
                    </div>
                    <div className="product-item">
                        <img src="/foods/besh.jpg" alt="Beshbarmak" />
                        <p>Beshbarmak</p>
                    </div>
                    <div className="product-item">
                        <img src="/foods/samsa.jpeg" alt="Samsa" />
                        <p>Samsa</p>
                    </div>
                </div>
                <div className="more-foods-message">
                    <p>И это ещё не всё — у нас есть множество других вкусных и свежих блюд, которые вы обязательно захотите заказать!</p>
                </div>
            </section>

            {/* Benefits */}
            <section id="benefits" className="section benefits">
                <h2>Benefits</h2>
                <p>Save time, increase productivity, and scale your projects faster with our tools.</p>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 MyApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
