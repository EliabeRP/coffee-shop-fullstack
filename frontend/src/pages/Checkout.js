import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { FaArrowLeft, FaCreditCard, FaBarcode, FaMoneyBillWave, FaPix } from 'react-icons/fa';
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
    const [paymentMethod, setPaymentMethod] = useState('');

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

        if (!paymentMethod) {
            setError('Por favor, selecione um método de pagamento.');
            return;
        }

        const payload = {
            id_user: userId,
            payment_method: paymentMethod,
            status: 'pendente',
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
                    <div className="checkout-content">
                        <Card className="checkout-card shadow-sm mb-4">
                            <Card.Header className="bg-white border-bottom-0 pt-4 px-4">
                                <h5 className="mb-0">Escolha o Método de Pagamento</h5>
                            </Card.Header>
                            <Card.Body className="px-4 pb-4">
                                <Form>
                                    <div className="payment-options d-flex flex-column gap-3">
                                        <label className={`payment-option-card ${paymentMethod === 'credit_card' ? 'selected' : ''}`}>
                                            <Form.Check
                                                type="radio"
                                                name="paymentMethod"
                                                id="credit_card"
                                                label={<span><FaCreditCard className="me-2" /> Cartão de Crédito</span>}
                                                onChange={() => setPaymentMethod('credit_card')}
                                            />
                                        </label>

                                        <label className={`payment-option-card ${paymentMethod === 'pix' ? 'selected' : ''}`}>
                                            <Form.Check
                                                type="radio"
                                                name="paymentMethod"
                                                id="pix"
                                                label={<span><FaMoneyBillWave className="me-2" /> Pix</span>}
                                                onChange={() => setPaymentMethod('pix')}
                                            />
                                        </label>

                                        <label className={`payment-option-card ${paymentMethod === 'boleto' ? 'selected' : ''}`}>
                                            <Form.Check
                                                type="radio"
                                                name="paymentMethod"
                                                id="boleto"
                                                label={<span><FaBarcode className="me-2" /> Boleto Bancário</span>}
                                                onChange={() => setPaymentMethod('boleto')}
                                            />
                                        </label>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card className="checkout-card shadow-sm">
                            <Card.Body className="p-4">
                                <div className="summary-line">
                                    <span>Itens no pedido</span>
                                    <strong>{count}</strong>
                                </div>
                                <div className="summary-line total border-top pt-3 mt-3">
                                    <span>Total a pagar</span>
                                    <strong className="fs-4 text-primary">R$ {total.toFixed(2)}</strong>
                                </div>

                                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                                <Button
                                    variant="none"
                                    className="finish-btn mt-4 w-100"
                                    onClick={handleFinishOrder}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <><Spinner animation="border" size="sm" /> Processando...</>
                                    ) : (
                                        <><FaCreditCard /> Confirmar e Pagar</>
                                    )}
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </Container>
        </div>
    );
}