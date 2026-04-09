import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Alert, Spinner, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { 
    FaSyncAlt, FaUsers, FaBoxOpen, FaShoppingBag, FaDollarSign, 
    FaCheck, FaTruck, FaClock, FaList, FaPercent, FaEdit, FaTrash, FaExclamationTriangle 
} from 'react-icons/fa';
import NavBar from '../components/NavBar';
import { getUserRoleFromToken } from '../utils/auth';
import './AdminDashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [discountOrders, setDiscountOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [filterDiscount, setFilterDiscount] = useState(false);
    const [filterLowStock, setFilterLowStock] = useState(false);

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

    const fetchDiscountOrders = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/order/discount-report`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDiscountOrders(response.data || []);
        } catch (err) {
            console.error('Erro ao buscar relatório de descontos:', err);
        }
    }, []);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter(p => p.id !== productId));
        } catch (err) {
            alert('Erro ao excluir produto. Verifique dependências.');
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`${API_URL}/order/${orderId}/status`, 
                { status: newStatus }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchDashboardData(); 
            if (filterDiscount) fetchDiscountOrders();
        } catch (err) {
            alert('Erro ao atualizar status do pedido.');
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const filteredProducts = useMemo(() => {
        if (filterLowStock) {
            return products.filter(p => Number(p.quantity) <= 5);
        }
        return products;
    }, [products, filterLowStock]);

    const filteredOrders = useMemo(() => {
        return filterDiscount ? discountOrders : orders;
    }, [filterDiscount, orders, discountOrders]);

    const totalRevenue = useMemo(() => {
        return orders.reduce((acc, order) => acc + Number(order.total_price || 0), 0);
    }, [orders]);

    const formatCurrency = (value) => {
        return Number(value || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const getStatusBadge = (status) => {
        const variants = {
            'pendente': 'warning', 'enviado': 'info', 'entregue': 'success', 'cancelado': 'danger'
        };
        return <Badge bg={variants[status?.toLowerCase()] || 'secondary'}>{status?.toUpperCase()}</Badge>;
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <Container className="py-5 text-center">
                    <Spinner animation="border" />
                    <p className="mt-3">Carregando painel administrativo...</p>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <Container fluid className="admin-dashboard-page py-4 px-4">
                <div className="admin-head d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="admin-title">Painel de Controle</h1>
                        <p className="text-muted mb-0">Gestão de utilizadores, stock e vendas</p>
                    </div>
                    <Button variant="outline-primary" onClick={fetchDashboardData}>
                        <FaSyncAlt className="me-2" /> Atualizar Dados
                    </Button>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Row className="g-3 mb-4">
                    <Col md={3}><Card className="metric-card bg-light border-0 shadow-sm"><Card.Body><div className="text-primary h4"><FaUsers /></div><small className="text-muted">Usuários</small><h3>{users.length}</h3></Card.Body></Card></Col>
                    <Col md={3}><Card className="metric-card bg-light border-0 shadow-sm"><Card.Body><div className="text-success h4"><FaBoxOpen /></div><small className="text-muted">Produtos</small><h3>{products.length}</h3></Card.Body></Card></Col>
                    <Col md={3}><Card className="metric-card bg-light border-0 shadow-sm"><Card.Body><div className="text-warning h4"><FaShoppingBag /></div><small className="text-muted">Pedidos</small><h3>{orders.length}</h3></Card.Body></Card></Col>
                    <Col md={3}><Card className="metric-card bg-light border-0 shadow-sm"><Card.Body><div className="text-info h4"><FaDollarSign /></div><small className="text-muted">Faturamento</small><h3>{formatCurrency(totalRevenue)}</h3></Card.Body></Card></Col>
                </Row>

                <Row className="g-4">
                    <Col lg={4}>
                        <Card className="admin-table-card border-0 shadow-sm">
                            <Card.Header className="bg-white fw-bold">Usuários Registados</Card.Header>
                            <Card.Body className="p-0">
                                <Table hover responsive className="mb-0">
                                    <thead className="table-light"><tr><th>Nome</th><th>Role</th></tr></thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id}>
                                                <td>{u.name}</td>
                                                <td><Badge bg={u.role === 'admin' ? 'danger' : 'secondary'}>{u.role}</Badge></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={8}>
                        <Card className="admin-table-card border-0 shadow-sm">
                            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                <span className="fw-bold">Gestão de Stock</span>
                                <ButtonGroup size="sm">
                                    <Button 
                                        variant={!filterLowStock ? "secondary" : "outline-secondary"} 
                                        onClick={() => setFilterLowStock(false)}
                                    >
                                        Todos
                                    </Button>
                                    <Button 
                                        variant={filterLowStock ? "danger" : "outline-danger"} 
                                        onClick={() => setFilterLowStock(true)}
                                    >
                                        <FaExclamationTriangle className="me-1" /> Baixo Stock
                                    </Button>
                                </ButtonGroup>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table hover responsive className="mb-0">
                                    <thead className="table-light">
                                        <tr><th>Produto</th><th>Preço</th><th>Qtd</th><th className="text-center">Ações</th></tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.name}</td>
                                                <td>{formatCurrency(p.price)}</td>
                                                <td>
                                                    <Badge bg={Number(p.quantity) <= 5 ? 'danger' : 'success'}>
                                                        {p.quantity}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">
                                                    <ButtonGroup size="sm">
                                                        <Button variant="outline-primary" onClick={() => navigate(`/admin/products/edit/${p.id}`)}><FaEdit /></Button>
                                                        <Button variant="outline-danger" onClick={() => handleDeleteProduct(p.id)}><FaTrash /></Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <Card.Footer className="bg-white border-0 text-end">
                                <Button size="sm" variant="success" onClick={() => navigate('/admin/products/new')}>+ Novo Produto</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Card className="admin-table-card border-0 shadow-sm">
                            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                <span className="fw-bold">Pedidos</span>
                                <ButtonGroup size="sm">
                                    <Button 
                                        variant={!filterDiscount ? "primary" : "outline-primary"} 
                                        onClick={() => setFilterDiscount(false)}
                                    >
                                        <FaList className="me-1" /> Todos
                                    </Button>
                                    <Button 
                                        variant={filterDiscount ? "success" : "outline-success"} 
                                        onClick={() => { setFilterDiscount(true); fetchDiscountOrders(); }}
                                    >
                                        <FaPercent className="me-1" /> Com Desconto
                                    </Button>
                                </ButtonGroup>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table hover responsive className="mb-0">
                                    <thead className="table-light">
                                        <tr><th>ID</th><th>Cliente</th><th>Total</th><th>Status</th><th className="text-center">Alterar Status</th></tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.map(o => (
                                            <tr key={o.pedido_id || o.id}>
                                                <td>#{o.pedido_id || o.id}</td>
                                                <td>{o.cliente_nome || `User ID: ${o.id_user}`}</td>
                                                <td className="fw-bold">{formatCurrency(o.valor_final || o.total_price)}</td>
                                                <td>{getStatusBadge(o.status)}</td>
                                                <td className="text-center">
                                                    <ButtonGroup size="sm">
                                                        <Button variant="outline-warning" onClick={() => handleUpdateStatus(o.pedido_id || o.id, 'pendente')}><FaClock /></Button>
                                                        <Button variant="outline-info" onClick={() => handleUpdateStatus(o.pedido_id || o.id, 'enviado')}><FaTruck /></Button>
                                                        <Button variant="outline-success" onClick={() => handleUpdateStatus(o.pedido_id || o.id, 'entregue')}><FaCheck /></Button>
                                                    </ButtonGroup>
                                                </td>
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