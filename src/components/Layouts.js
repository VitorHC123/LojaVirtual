// Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 


const Layout = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">🛒 Digital Point</div>
                <nav className="navbar-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/categorias">Categorias</Link>
                    <Link to="/contato">Contato</Link>
                    <Link to="/sobre-nos">Sobre Nós</Link>
                    <Link to="/carrinho">
                        <span className="cart-icon">🛒</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Layout;
