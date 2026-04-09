import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import './UserEdit.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

function getUserIdFromToken(token) {
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        if (!payload) return null;

        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(normalized));
        return decoded.id || null;
    } catch (error) {
        return null;
    }
}

export default function UserEdit() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isFlamengo, setIsFlamengo] = useState(false);
    const [assisteOnePiece, setAssisteOnePiece] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken(token);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token || !userId) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setName(response.data.name || '');
                setEmail(response.data.email || '');
                setIsFlamengo(!!response.data.is_flamengo);
                setAssisteOnePiece(!!response.data.assiste_one_piece);
                
                setError('');
            } catch (err) {
                console.error('Erro ao carregar dados do usuário:', err);
                setError(err?.response?.data?.message || 'Não foi possível carregar os dados.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate, token, userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim() || !email.trim()) {
            setError('Nome e email são obrigatórios.');
            return;
        }

        const payload = {
            name,
            email,
            is_flamengo: isFlamengo,
            assiste_one_piece: assisteOnePiece
        };

        if (password.trim()) {
            payload.password = password;
        }

        try {
            setSaving(true);
            setError('');
            setSuccess('');

            await axios.put(`${API_URL}/user/${userId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess('Perfil atualizado com sucesso!');
            setPassword('');
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            const apiMessage = err?.response?.data?.message;
            const apiErrors = err?.response?.data?.errors;
            setError(apiMessage || (Array.isArray(apiErrors) ? apiErrors.join(' ') : 'Erro ao atualizar perfil.'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <NavBar />
            <Container className="user-edit-page py-5">
                <Button variant="none" className="back-button mb-4 p-0" onClick={() => navigate('/profile')}>
                    <FaArrowLeft className="me-2" /> Voltar ao Perfil
                </Button>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" variant="primary" />
                        <p className="mt-3">Carregando seus dados...</p>
                    </div>
                ) : (
                    <Card className="edit-card shadow-sm border-0">
                        <Card.Body className="p-4">
                            <Card.Title className="mb-4 fw-bold">Editar Perfil</Card.Title>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="editName">
                                    <Form.Label className="fw-bold">Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Digite seu nome"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editEmail">
                                    <Form.Label className="fw-bold">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="Digite seu email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editPassword">
                                    <Form.Label className="fw-bold">Nova Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Deixe em branco para não alterar"
                                    />
                                </Form.Group>

                                <hr className="my-4" />
                                <h6 className="mb-3 text-muted fw-bold">PREFERÊNCIAS</h6>

                                <Form.Group className="mb-2">
                                    <Form.Check 
                                        type="checkbox"
                                        id="edit-flamengo"
                                        label="Torcedor do Flamengo"
                                        checked={isFlamengo}
                                        onChange={(e) => setIsFlamengo(e.target.checked)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Check 
                                        type="checkbox"
                                        id="edit-onepiece"
                                        label="Assiste One Piece"
                                        checked={assisteOnePiece}
                                        onChange={(e) => setAssisteOnePiece(e.target.checked)}
                                    />
                                </Form.Group>

                                <Button type="submit" variant="none" className="save-btn w-100 py-2" style={{ backgroundColor: "#D2691E", color: "white" }} disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Spinner size="sm" animation="border" className="me-2" /> Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave className="me-2" /> Salvar Alterações
                                        </>
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
}