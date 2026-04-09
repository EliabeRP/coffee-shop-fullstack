import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaBoxOpen, FaCalendarAlt, FaTag, FaShoppingBasket } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import './UserOrders.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export default function UserOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const [ordersResponse, productsResponse] = await Promise.all([
                axios.get(`${API_URL}/order/my-orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${API_URL}/product`)
            ]);

            setOrders(ordersResponse.data || []);
            setProducts(productsResponse.data || []);
            setError('');
        } catch (err) {
            console.error('Erro ao buscar histórico:', err);
            setError(err?.response?.data?.message || 'Não foi possível carregar seu histórico de pedidos.');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getProductInfo = (productId) => {
        return products.find(p => Number(p.id) === Number(productId));
    };

    const formatDate = (value) => {
        if (!value) return 'Data indisponível';
        return new Date(value).toLocaleString('pt-BR');
    };

    const formatCurrency = (value) => {
        return Number(value || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (
        <div>
            <NavBar />
            <Container className="user-orders-page py-5">
                <Button variant="none" className="back-button mb-4 p-0" onClick={() => navigate('/profile')}>
                    <FaArrowLeft className="me-2" /> Voltar ao Perfil
                </Button>

                <h2 className="orders-title mb-4 fw-bold">Minhas Compras</h2>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3 text-muted">Carregando seus pedidos...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : orders.length === 0 ? (
                    <Card className="orders-empty border-0 shadow-sm text-center py-5">
                        <Card.Body>
                            <FaBoxOpen size={50} className="text-muted mb-3" />
                            <p className="text-muted">Você ainda não realizou nenhum pedido.</p>
                            <Button variant="outline-primary" onClick={() => navigate('/')}>Ver Produtos</Button>
                        </Card.Body>
                    </Card>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <Card key={order.id} className="order-card shadow-sm mb-4 border-0">
                                <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fw-bold d-block text-primary">Pedido #{order.id}</span>
                                        <small className="text-muted">
                                            <FaCalendarAlt className="me-1" /> {formatDate(order.created_at)}
                                        </small>
                                    </div>
                                    <div className="text-end">
                                        <Badge bg="info" text="dark" className="mb-1">
                                            {order.status.toUpperCase()}
                                        </Badge>
                                        <div className="fw-bold text-success h5 mb-0">
                                            {formatCurrency(order.total_price)}
                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <h6 className="small fw-bold text-muted mb-3">RESUMO DOS ITENS:</h6>
                                    {order.products && order.products.map((item, index) => {
                                        const details = getProductInfo(item.id);
                                        
                                        return (
                                            <div 
                                                key={`${order.id}-${item.id}-${index}`} 
                                                className="d-flex justify-content-between align-items-center py-2 border-bottom"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-light p-2 rounded me-3">
                                                        <FaShoppingBasket className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold">{details ? details.name : `Produto #${item.id}`}</div>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <div className="small text-muted">
                                                        Un: {formatCurrency(details?.price || 0)}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}