import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './UserMenu.css';

export default function UserMenu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Button
            ref={ref}
            variant="none"
            className="user-menu-button"
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            title="Menu Usuário"
        >
            <FaUser size={24} />
        </Button>
    ));

    CustomToggle.displayName = 'CustomToggle';

    return (
        <div className="user-menu-container">
            <Dropdown className="d-flex">
                <Dropdown.Toggle as={CustomToggle} id="user-dropdown" />

                <Dropdown.Menu align="end">
                    {isLoggedIn ? (
                        <>
                            <Dropdown.Item
                                onClick={() => handleNavigation('/profile')}
                                className="user-menu-item"
                            >
                                <FaUser size={16} />
                                <span>Perfil</span>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={handleLogout}
                                className="user-menu-item logout"
                            >
                                <FaSignOutAlt size={16} />
                                <span>Logout</span>
                            </Dropdown.Item>
                        </>
                    ) : (
                        <>
                            <Dropdown.Item
                                onClick={() => handleNavigation('/login')}
                                className="user-menu-item"
                            >
                                <FaSignInAlt size={16} />
                                <span>Login</span>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={() => handleNavigation('/register')}
                                className="user-menu-item"
                            >
                                <FaUserPlus size={16} />
                                <span>Cadastro</span>
                            </Dropdown.Item>
                        </>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
