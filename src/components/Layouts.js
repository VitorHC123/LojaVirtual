import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Layout = () => {
    return (
        <header>
            <div className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo"> Digital Point</div>
                    <nav className="navbar-links">
                        <div className="tooltip-container">
                            <Link to="#" className="atendimento-link">Contato</Link>
                            <div className="tooltip">
                                <p><strong>Telefone:</strong> (14) 99999-9999</p>
                                <p><strong>Email:</strong> digitalpoint@dpoint.com.br</p>
                                <p><strong>Endereço:</strong> Rua Qualquer, 555</p>
                            </div>
                        </div>
                        <Link to="/sobre-nos">Sobre Nós</Link>
                        <Link to="/carrinho">
                            <span className="cart-icon">🛒</span>
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="navbar secondary-navbar">
                <div className="navbar-container">
                    <nav className="navbar-links-subnav">
                        <Link to="/categoria">Categoria</Link>
                        <Link to="/produtos">Produtos</Link>
                        <Link to="/ofertas">Ofertas</Link>
                        <Link to="/cupons">Cupons</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Layout;
