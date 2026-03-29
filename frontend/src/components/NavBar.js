import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Pesquisa:', searchQuery);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo" style={{ textDecoration: "none"}}>
                <div className="navbar-logo">
                    <strong style={{ color: '#F5DEB3' }}>SQLATTE</strong>
                    <img src="/cafezinho.png" alt="Logo Cafezinho" />
                </div>
            </Link>

            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <FaSearch size={18} />
                </button>
            </form>

            <div className="navbar-icons">
                <button className="navbar-icon-btn" title="Carrinho">
                    <FaShoppingCart size={24} />
                </button>
                <button className="navbar-icon-btn" title="Perfil">
                    <FaUser size={24} />
                </button>
            </div>
        </nav>
    );
}

