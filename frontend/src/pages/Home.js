import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import './Home.css';

export default function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    image: product.image
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

    return(
        <div>
            <NavBar />
            <Container fluid className="home-container py-5">
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Carregando produtos...</span>
                        </Spinner>
                        <p className="mt-3">Carregando produtos...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger" role="alert">
                        {error}
                    </Alert>
                ) : products.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <p>Nenhum produto disponível</p>
                    </div>
                ) : (
                    <Row className="g-4 justify-content-center">
                        {products.map(product => (
                            <Col 
                                key={product.id} 
                                xs={12} 
                                sm={6} 
                                md={4} 
                                lg={3}
                                className="d-flex justify-content-center"
                            >
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}