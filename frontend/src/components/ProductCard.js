import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const {
        id = 1,
        title = 'Nome do Produto',
        price = 0.00,
        stock = 0,
        image = 'https://via.placeholder.com/250x250?text=Produto'
    } = product || {};

    const handleProductClick = () => {
        navigate(`/product/${id}`);
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        console.log('Comprar agora:', id);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        console.log('Adicionar ao carrinho:', id);
    };

    const inStock = stock > 0;

    return (
        <Card 
            className="product-card h-100"
            onClick={handleProductClick}
            style={{ cursor: 'pointer', width: '280px' }}
        >
            <div className="product-image">
                <Card.Img 
                    variant="top" 
                    src={image} 
                    alt={title}
                    className="product-img"
                />
                {!inStock && <div className="out-of-stock">Fora de Estoque</div>}
            </div>

            <Card.Body className="product-info d-flex flex-column">
                <Card.Title className="product-title">{title}</Card.Title>

                <div className="product-details mb-3">
                    <div className="product-price">
                        <span className="price-label">Preço</span>
                        <span className="price-value">R$ {price.toFixed(2)}</span>
                    </div>
                    <div className="product-stock">
                        <span className="stock-label">Em Estoque</span>
                        <span className={`stock-value ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {stock} unidades
                        </span>
                    </div>
                </div>

                <div className="product-actions mt-auto d-flex flex-column gap-2">
                    <Button
                        className="btn-buy-now"
                        onClick={handleBuyNow}
                        disabled={!inStock}
                        title="Comprar agora"
                        variant="none"
                    >
                        <FaBolt size={16} />
                        Comprar
                    </Button>
                    <Button
                        className="btn-add-cart"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        title="Adicionar ao carrinho"
                        variant="none"
                    >
                        <FaShoppingCart size={16} />
                        Carrinho
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
