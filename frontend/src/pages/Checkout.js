import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import { clearCart, getCartItems } from '../utils/cart';
import { getUserIdFromToken } from '../utils/auth';
import './Checkout.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export default function Checkout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const items = getCartItems();
    const total = items.reduce((acc, item) => {
        return acc + (Number(item.price || 0) * Number(item.quantity || 0));
    }, 0);

    const count = items.reduce((acc, item) => {
        return acc + Number(item.quantity || 0);
    }, 0);

    const handleFinishOrder = async () => {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken(token);

        if (!token || !userId) {
            navigate('/login');
            return;
        }

        if (items.length === 0) {
            setError('Seu carrinho está vazio.');
            return;
        }

        const payload = {
            id_user: userId,
            products: items.map((item) => ({
                id: Number(item.id),
                quantidade: Number(item.quantity),
            })),
        };

        try {
            setLoading(true);
            setError('');
            await axios.post(`${API_URL}/order`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            clearCart();
            setSuccess('Pedido realizado com sucesso!');
        } catch (err) {
            console.error('Erro ao finalizar pedido:', err);
            const apiMessage = err?.response?.data?.message;
            const apiErrors = err?.response?.data?.errors;
            setError(apiMessage || (Array.isArray(apiErrors) ? apiErrors.join(' ') : 'Não foi possível finalizar o pedido.'));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div>
                <NavBar />
                <Container className="checkout-page py-5">
                    <Alert variant="success" className="mb-4">{success}</Alert>
                    <div className="d-flex gap-3 flex-wrap">
                        <Button variant="none" className="finish-btn" onClick={() => navigate('/profile/orders')}>
                            Ver Histórico de Pedidos
                        </Button>
                        <Button variant="none" className="secondary-btn" onClick={() => navigate('/')}>
                            Voltar para Home
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <Container className="checkout-page py-5">
                <Button variant="none" className="back-button mb-4" onClick={() => navigate('/cart')}>
                    <FaArrowLeft /> Voltar ao Carrinho
                </Button>

                <h1 className="checkout-title mb-4">Finalizar Compra</h1>

                {items.length === 0 ? (
                    <Alert variant="warning">Seu carrinho está vazio.</Alert>
                ) : (
                    <Card className="checkout-card shadow-sm">
                        <Card.Body>
                            <div className="summary-line">
                                <span>Itens no pedido</span>
                                <strong>{count}</strong>
                            </div>
                            <div className="summary-line total">
                                <span>Total</span>
                                <strong>R$ {total.toFixed(2)}</strong>
                            </div>

                            {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}

                            <Button
                                variant="none"
                                className="finish-btn mt-4"
                                onClick={handleFinishOrder}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Processando...
                                    </>
                                ) : (
                                    <>
                                        <FaCreditCard /> Confirmar Pedido
                                    </>
                                )}
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
}
