import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import './UserOrders.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export default function UserOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/order/my-orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setOrders(response.data || []);
                setError('');
            } catch (err) {
                console.error('Erro ao buscar histórico de pedidos:', err);
                setError(err?.response?.data?.message || 'Não foi possível carregar o histórico de pedidos.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const formatDate = (value) => {
        if (!value) return 'Data indisponível';
        return new Date(value).toLocaleString('pt-BR');
    };

    const formatCurrency = (value) => {
        const total = Number(value || 0);
        return total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (
        <div>
            <NavBar />
            <Container className="user-orders-page py-5">
                <Button variant="none" className="back-button mb-4" onClick={() => navigate('/profile')}>
                    <FaArrowLeft /> Voltar ao Perfil
                </Button>

                <h1 className="orders-title mb-4">Histórico de Pedidos</h1>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Carregando histórico...</span>
                        </Spinner>
                        <p className="mt-3">Carregando histórico...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : orders.length === 0 ? (
                    <Card className="orders-empty shadow-sm">
                        <Card.Body className="text-center py-5">
                            <FaBoxOpen size={30} className="mb-3" />
                            <p className="mb-0">Você ainda não possui pedidos.</p>
                        </Card.Body>
                    </Card>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <Card key={order.id} className="order-card shadow-sm mb-3">
                                <Card.Body>
                                    <div className="order-head mb-3">
                                        <div>
                                            <strong>Pedido #{order.id}</strong>
                                            <p className="mb-0 text-muted">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <Badge bg="warning" text="dark" className="order-total">
                                            {formatCurrency(order.total_price)}
                                        </Badge>
                                    </div>

                                    <div className="order-items">
                                        {(order.products || []).map((item, index) => (
                                            <div className="order-item" key={`${order.id}-${item.id}-${index}`}>
                                                <span>Produto ID: {item.id}</span>
                                                <span>Qtd: {item.quantidade}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
