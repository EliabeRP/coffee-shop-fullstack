import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import './Home.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Estados dos Filtros
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');

    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3333';
                const response = await axios.get(`${apiUrl}/product`);

                const formattedProducts = response.data.map(product => ({
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    stock: product.quantity,
                    image: product.image,
                    category: product.category,
                    origin: product.origin 
                }));

                setProducts(formattedProducts);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
                setError('Erro ao carregar produtos. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const term = queryParams.get('search') || '';

        let filtered = [...products];

        if (term.trim() !== '') {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (maxPrice !== '') {
            const numericMax = parseFloat(maxPrice);
            filtered = filtered.filter(p => parseFloat(p.price) <= numericMax);
        }

        if (selectedCategory !== '') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (selectedOrigin !== '') {
            filtered = filtered.filter(p => p.origin === selectedOrigin);
        }

        setFilteredProducts(filtered);

    }, [location.search, products, maxPrice, selectedCategory, selectedOrigin]);

    const categories = ['Arábica', 'Robusta']
    const origins = ['Mari', 'Costa Rica', 'Colômbia'];

    return (
        <div>
            <NavBar />
            <Container fluid className="home-container py-5">
                
                {/* Seção de Filtros */}
                <Row className="mb-4 g-3 justify-content-center align-items-end">
                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Label>Preço até:</Form.Label>
                            <InputGroup size="sm">
                                <InputGroup.Text>R$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="Ex: 20.00"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                                {maxPrice && (
                                    <Button variant="outline-secondary" onClick={() => setMaxPrice('')}>X</Button>
                                )}
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Label>Categoria:</Form.Label>
                            <Form.Select 
                                size="sm" 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Todas as Categorias</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Label>Origem:</Form.Label>
                            <Form.Select 
                                size="sm" 
                                value={selectedOrigin} 
                                onChange={(e) => setSelectedOrigin(e.target.value)}
                            >
                                <option value="">Todas as Origens</option>
                                {origins.map(ori => (
                                    <option key={ori} value={ori}>{ori}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <hr />

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" />
                        <p className="mt-3">Carregando produtos...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <p>Nenhum produto encontrado para os filtros selecionados.</p>
                    </div>
                ) : (
                    <Row className="g-4 justify-content-center">
                        {filteredProducts.map(product => (
                            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}