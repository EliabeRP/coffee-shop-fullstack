import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaUserEdit, FaClipboardList } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import './UserDetails.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

function getUserIdFromToken(token) {
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        if (!payload) return null;

        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(normalized));
        return decoded.id || null;
    } catch (error) {
        return null;
    }
}

export default function UserDetails() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const userId = getUserIdFromToken(token);

            if (!token || !userId) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
                setError('');
            } catch (err) {
                console.error('Erro ao buscar perfil:', err);
                setError(err?.response?.data?.message || 'Não foi possível carregar o perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <div>
            <NavBar />
            <Container className="user-details-page py-5">
                <Button variant="none" className="back-button mb-4" onClick={() => navigate('/')}>
                    <FaArrowLeft /> Voltar
                </Button>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Carregando perfil...</span>
                        </Spinner>
                        <p className="mt-3">Carregando perfil...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Card className="profile-card shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Meu Perfil</Card.Title>

                            <div className="profile-row">
                                <span className="profile-label">Nome</span>
                                <span className="profile-value">{user?.name}</span>
                            </div>

                            <div className="profile-row">
                                <span className="profile-label">Email</span>
                                <span className="profile-value">{user?.email}</span>
                            </div>

                            <div className="profile-row">
                                <span className="profile-label">Perfil</span>
                                <span className="profile-value">
                                    <Badge bg={user?.role === 'admin' ? 'danger' : 'secondary'}>
                                        {user?.role}
                                    </Badge>
                                </span>
                            </div>

                            <Button
                                className="edit-profile-btn mt-4"
                                variant="none"
                                onClick={() => navigate('/profile/edit')}
                            >
                                <FaUserEdit /> Editar Dados
                            </Button>

                            <Button
                                className="orders-history-btn mt-3"
                                variant="none"
                                onClick={() => navigate('/profile/orders')}
                            >
                                <FaClipboardList /> Ver Histórico de Pedidos
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
}
