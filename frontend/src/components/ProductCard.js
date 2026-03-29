import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
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
        <div className="product-card" onClick={handleProductClick}>
            <div className="product-image">
                <img src={image} alt={title} />
                {!inStock && <div className="out-of-stock">Fora de Estoque</div>}
            </div>

            <div className="product-info">
                <h3 className="product-title">{title}</h3>

                <div className="product-details">
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

                <div className="product-actions">
                    <button
                        className="btn-buy-now"
                        onClick={handleBuyNow}
                        disabled={!inStock}
                        title="Comprar agora"
                    >
                        <FaBolt size={16} />
                        Comprar
                    </button>
                    <button
                        className="btn-add-cart"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        title="Adicionar ao carrinho"
                    >
                        <FaShoppingCart size={16} />
                        Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}
