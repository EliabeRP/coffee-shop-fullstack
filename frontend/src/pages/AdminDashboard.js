import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Alert, Spinner, Button, Badge } from 'react-bootstrap';
import { FaSyncAlt, FaUsers, FaBoxOpen, FaShoppingBag, FaDollarSign } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import { getUserRoleFromToken } from '../utils/auth';
import './AdminDashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchDashboardData = useCallback(async () => {
        const token = localStorage.getItem('token');
        const role = getUserRoleFromToken(token);

        if (!token) {
            navigate('/login');
            return;
        }

        if (role !== 'admin') {
            navigate('/');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const [usersResponse, ordersResponse, productsResponse] = await Promise.all([
                axios.get(`${API_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${API_URL}/order`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${API_URL}/product`),
            ]);

            setUsers(usersResponse.data || []);
            setOrders(ordersResponse.data || []);
            setProducts(productsResponse.data || []);
        } catch (err) {
            console.error('Erro ao carregar painel admin:', err);
            setError(err?.response?.data?.message || 'Não foi possível carregar o painel administrativo.');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const totalRevenue = useMemo(() => {
        return orders.reduce((acc, order) => acc + Number(order.total_price || 0), 0);
    }, [orders]);

    const lowStockProducts = useMemo(() => {
        return products.filter((product) => Number(product.quantity || 0) <= 5).length;
    }, [products]);

    const formatCurrency = (value) => {
        return Number(value || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <Container className="admin-dashboard-page py-5">
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" />
                        <p className="mt-3">Carregando painel administrativo...</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <Container fluid className="admin-dashboard-page py-4 px-4">
                <div className="admin-head mb-4">
                    <div>
                        <h1 className="admin-title">Painel de Controle</h1>
                        <p className="text-muted mb-0">Visão geral da operação da loja</p>
                    </div>
                    <Button className="refresh-btn" variant="none" onClick={fetchDashboardData}>
                        <FaSyncAlt /> Atualizar
                    </Button>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Row className="g-3 mb-4">
                    <Col md={6} lg={3}>
                        <Card className="metric-card users">
                            <Card.Body>
                                <div className="metric-icon"><FaUsers /></div>
                                <p className="metric-label">Usuários</p>
                                <h3 className="metric-value">{users.length}</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card className="metric-card products">
                            <Card.Body>
                                <div className="metric-icon"><FaBoxOpen /></div>
                                <p className="metric-label">Produtos</p>
                                <h3 className="metric-value">{products.length}</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card className="metric-card orders">
                            <Card.Body>
                                <div className="metric-icon"><FaShoppingBag /></div>
                                <p className="metric-label">Pedidos</p>
                                <h3 className="metric-value">{orders.length}</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card className="metric-card revenue">
                            <Card.Body>
                                <div className="metric-icon"><FaDollarSign /></div>
                                <p className="metric-label">Faturamento</p>
                                <h3 className="metric-value">{formatCurrency(totalRevenue)}</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col lg={6}>
                        <Card className="admin-table-card h-100">
                            <Card.Header className="table-title">Usuários Cadastrados</Card.Header>
                            <Card.Body className="table-wrapper">
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Perfil</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card className="admin-table-card h-100">
                            <Card.Header className="table-title d-flex justify-content-between align-items-center">
                                <span>Produtos</span>
                                <small className="text-muted">Estoque baixo: {lowStockProducts}</small>
                            </Card.Header>
                            <Card.Body className="table-wrapper">
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Preço</th>
                                            <th>Qtd</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{formatCurrency(product.price)}</td>
                                                <td>
                                                    <Badge bg={Number(product.quantity) <= 5 ? 'warning' : 'success'} text={Number(product.quantity) <= 5 ? 'dark' : 'light'}>
                                                        {product.quantity}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Card className="admin-table-card">
                            <Card.Header className="table-title">Pedidos Recentes</Card.Header>
                            <Card.Body className="table-wrapper">
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Pedido</th>
                                            <th>Cliente (ID)</th>
                                            <th>Itens</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>
                                                <td>{order.id_user}</td>
                                                <td>{Array.isArray(order.products) ? order.products.length : 0}</td>
                                                <td>{formatCurrency(order.total_price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
