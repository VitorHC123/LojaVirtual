import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css'; 

const Layout = () => {
    return (
        <header>
            <div className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">Administração - Digital Point</div>
                    <nav className="navbar-links">
                        <Link to="/perfil">
                            <img>

                            </img>
                        </Link>
                        <Link to="/config">Configurações</Link> 
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Layout;
