import React, { useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import UserMenu from './UserMenu';
import './NavBar.css';

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
        <Navbar bg="custom" expand="lg" className="navbar-custom sticky-top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-logo">
                    <strong style={{ color: '#F5DEB3', marginRight: '0.5rem' }}>SQLATTE</strong>
                    <img src="/cafezinho.png" alt="Logo Cafezinho" />
                </Navbar.Brand>

                <Form className="navbar-search flex-grow-1" onSubmit={handleSearchSubmit}>
                    <div className="navbar-search-group">
                        <Form.Control
                            placeholder="Pesquisar produtos..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <Button 
                            type="submit" 
                            className="search-button"
                            variant="none"
                        >
                            <FaSearch size={18} />
                        </Button>
                    </div>
                </Form>

                <div className="navbar-icons">
                    <Button 
                        className="navbar-icon-btn" 
                        variant="none"
                        title="Carrinho"
                    >
                        <FaShoppingCart size={24} />
                    </Button>
                    <UserMenu />
                </div>
            </Container>
        </Navbar>
    );
}

