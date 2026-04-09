import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { FaSave, FaArrowLeft, FaBox, FaTags, FaGlobeAmericas } from 'react-icons/fa';
import NavBar from '../components/NavBar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        category: '',
        origin: '' 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API_URL}/product/${id}`);
                    const { name, price, quantity, description, category, origin } = response.data;
                    setFormData({ 
                        name, 
                        price, 
                        quantity, 
                        description: description || '',
                        category: category || '',
                        origin: origin || ''
                    });
                } catch (err) {
                    setError('Erro ao carregar dados do produto.');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        try {
            if (isEdit) {
                await axios.put(`${API_URL}/product/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/product`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao salvar produto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <Container className="py-5">
                <Button variant="link" onClick={() => navigate('/admin')} className="mb-3 text-decoration-none p-0">
                    <FaArrowLeft /> Voltar para o Painel
                </Button>

                <Card className="shadow-sm border-0">
                    <Card.Header className="bg-white py-3">
                        <h4 className="mb-0">
                            <FaBox className="me-2 text-primary" />
                            {isEdit ? 'Editar Produto' : 'Novo Produto'}
                        </h4>
                    </Card.Header>
                    <Card.Body className="p-4">
                        {error && <Alert variant="danger">{error}</Alert>}
                        
                        {loading && isEdit && !formData.name ? (
                            <div className="text-center py-5"><Spinner animation="border" /></div>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Nome do Produto</Form.Label>
                                            <Form.Control
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Ex: Camiseta One Piece"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label><FaTags className="me-1" /> Categoria</Form.Label>
                                            <Form.Control
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                placeholder="Ex: Roupas, Acessórios..."
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label><FaGlobeAmericas className="me-1" /> Origem</Form.Label>
                                            <Form.Control
                                                name="origin"
                                                value={formData.origin}
                                                onChange={handleChange}
                                                placeholder="Ex: Nacional ou Importado"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Preço (R$)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="0.01"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Quantidade</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                placeholder="0"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12} className="mb-4">
                                        <Form.Group>
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Detalhes do produto..."
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        disabled={loading}
                                        className="px-5 py-2"
                                    >
                                        {loading ? <Spinner size="sm" /> : <><FaSave className="me-2" /> Salvar</>}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}