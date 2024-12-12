import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
                <NavLink to="/" className="nav-link">Главная</NavLink>
                <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
                <NavLink to="/about" className="nav-link">О нас</NavLink>
                <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
        </nav>
    );
};

export default Navbar;
