import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaBolt, FaArrowLeft } from 'react-icons/fa';
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import './ProductDetails.css';
import { addCartItem } from '../utils/cart';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3333';
                const response = await axios.get(`${apiUrl}/product/${id}`);

                const formattedProduct = {
                    id: id,
                    title: response.data.name,
                    price: response.data.price,
                    description: response.data.description,
                    stock: response.data.quantity,
                    image: response.data.image
                };

                setProduct(formattedProduct);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar produto:', err);
                setError('Erro ao carregar produto. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        if (!product) return;
        addCartItem(product, 1);
        navigate('/checkout');
    };

    const handleAddToCart = () => {
        if (!product) return;
        addCartItem(product, 1);
        navigate('/cart');
    };

    const goBack = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <Container className="product-details-container">
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </Spinner>
                        <p className="mt-3">Carregando produto...</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NavBar />
                <Container className="product-details-container">
                    <Alert variant="danger" role="alert">
                        {error}
                    </Alert>
                </Container>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <NavBar />
                <Container className="product-details-container">
                    <Alert variant="warning" role="alert">
                        Produto não encontrado
                    </Alert>
                </Container>
            </div>
        );
    }

    const inStock = product.stock > 0;

    return (
        <div>
            <NavBar />
            <Container className="product-details-container py-5">
                <Button
                    variant="none"
                    className="back-button mb-4"
                    onClick={goBack}
                >
                    <FaArrowLeft /> Voltar
                </Button>

                <Row className="product-details g-5">
                    <Col md={6} lg={5} className="product-details-image-col">
                        <div className="product-details-image">
                            <img src={product.image} alt={product.title} />
                            {!inStock && <div className="out-of-stock">Fora de Estoque</div>}
                        </div>
                    </Col>

                    <Col md={6} lg={7} className="product-details-info d-flex flex-column">
                        <h1 className="product-details-title">{product.title}</h1>

                        <div className="product-details-price">
                            R$ {product.price.toFixed(2)}
                        </div>

                        <div className="product-details-stock">
                            <span className="label">Disponibilidade:</span>
                            <span className={`value ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                                {inStock ? (
                                    <Badge bg="success">{product.stock} em estoque</Badge>
                                ) : (
                                    <Badge bg="danger">Fora de estoque</Badge>
                                )}
                            </span>
                        </div>

                        <Alert variant="light" className="product-details-description">
                            <h5>Descrição</h5>
                            <p className="mb-0">{product.description}</p>
                        </Alert>

                        <div className="product-details-actions mt-auto gap-3 d-flex flex-column">
                            <Button
                                className="btn-buy-now"
                                onClick={handleBuyNow}
                                disabled={!inStock}
                                variant="none"
                                size="lg"
                            >
                                <FaBolt size={18} />
                                Comprar Agora
                            </Button>
                            <Button
                                className="btn-add-cart"
                                onClick={handleAddToCart}
                                disabled={!inStock}
                                variant="none"
                                size="lg"
                            >
                                <FaShoppingCart size={18} />
                                Adicionar ao Carrinho
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
