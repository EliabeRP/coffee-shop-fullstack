import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import {
    getCartItems,
    updateCartItemQuantity,
    removeCartItem,
} from '../utils/cart';
import './Cart.css';

export default function Cart() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCartItems());
    }, []);

    const total = items.reduce((acc, item) => {
        return acc + (Number(item.price || 0) * Number(item.quantity || 0));
    }, 0);

    const count = items.reduce((acc, item) => {
        return acc + Number(item.quantity || 0);
    }, 0);

    const handleIncrease = (item) => {
        const stock = Number(item.stock || 0);
        if (stock && item.quantity >= stock) return;
        const nextItems = updateCartItemQuantity(item.id, Number(item.quantity) + 1);
        setItems(nextItems);
    };

    const handleDecrease = (item) => {
        if (item.quantity <= 1) return;
        const nextItems = updateCartItemQuantity(item.id, Number(item.quantity) - 1);
        setItems(nextItems);
    };

    const handleRemove = (itemId) => {
        const nextItems = removeCartItem(itemId);
        setItems(nextItems);
    };

    return (
        <div>
            <NavBar />
            <Container className="cart-page py-5">
                <Button variant="none" className="back-button mb-4" onClick={() => navigate('/')}>
                    <FaArrowLeft /> Continuar Comprando
                </Button>

                <h1 className="cart-title mb-4">Meu Carrinho</h1>

                {items.length === 0 ? (
                    <Alert variant="warning">Seu carrinho está vazio.</Alert>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map((item) => (
                                <Card className="cart-card shadow-sm mb-3" key={item.id}>
                                    <Card.Body className="cart-card-body">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-main">
                                            <h5 className="mb-1">{item.title}</h5>
                                            <p className="mb-2 text-muted">R$ {Number(item.price).toFixed(2)}</p>
                                            <div className="quantity-controls">
                                                <Button
                                                    variant="none"
                                                    className="qty-btn"
                                                    onClick={() => handleDecrease(item)}
                                                >
                                                    <FaMinus />
                                                </Button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <Button
                                                    variant="none"
                                                    className="qty-btn"
                                                    onClick={() => handleIncrease(item)}
                                                >
                                                    <FaPlus />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="cart-item-side">
                                            <strong>
                                                R$ {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                                            </strong>
                                            <Button
                                                variant="none"
                                                className="remove-btn mt-2"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <FaTrash /> Remover
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>

                        <Card className="cart-summary shadow-sm mt-4">
                            <Card.Body>
                                <div className="summary-line">
                                    <span>Itens</span>
                                    <strong>{count}</strong>
                                </div>
                                <div className="summary-line total">
                                    <span>Total</span>
                                    <strong>R$ {total.toFixed(2)}</strong>
                                </div>
                                <Button
                                    className="checkout-btn mt-3"
                                    variant="none"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Ir para Compra
                                </Button>
                            </Card.Body>
                        </Card>
                    </>
                )}
            </Container>
        </div>
    );
}
