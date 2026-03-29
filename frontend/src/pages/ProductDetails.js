import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaBolt, FaArrowLeft } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import './ProductDetails.css';

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
        console.log('Comprar agora:', id);
    };

    const handleAddToCart = () => {
        console.log('Adicionar ao carrinho:', id);
    };

    const goBack = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="product-details-container">
                    <div className="loading">Carregando produto...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NavBar />
                <div className="product-details-container">
                    <div className="error">{error}</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <NavBar />
                <div className="product-details-container">
                    <div className="empty">Produto não encontrado</div>
                </div>
            </div>
        );
    }

    const inStock = product.stock > 0;

    return (
        <div>
            <NavBar />
            <div className="product-details-container">
                <button className="back-button" onClick={goBack}>
                    <FaArrowLeft /> Voltar
                </button>

                <div className="product-details">
                    <div className="product-details-image">
                        <img src={product.image} alt={product.title} />
                        {!inStock && <div className="out-of-stock">Fora de Estoque</div>}
                    </div>
                    
                    <div className="product-details-info">
                        <h1 className="product-details-title">{product.title}</h1>

                        <div className="product-details-price">
                            R$ {product.price.toFixed(2)}
                        </div>

                        <div className="product-details-stock">
                            <span className="label">Disponibilidade:</span>
                            <span className={`value ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                                {inStock ? `${product.stock} em estoque` : 'Fora de estoque'}
                            </span>
                        </div>

                        <div className="product-details-description">
                            <h3>Descrição</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-details-actions">
                            <button
                                className="btn-buy-now"
                                onClick={handleBuyNow}
                                disabled={!inStock}
                            >
                                <FaBolt size={18} />
                                Comprar Agora
                            </button>
                            <button
                                className="btn-add-cart"
                                onClick={handleAddToCart}
                                disabled={!inStock}
                            >
                                <FaShoppingCart size={18} />
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
