import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            <div className="home-container">
                {loading ? (
                    <div className="loading">Carregando produtos...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : products.length === 0 ? (
                    <div className="empty">Nenhum produto disponível</div>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}