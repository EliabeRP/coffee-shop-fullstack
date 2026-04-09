import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [isFlamengo, setIsFlamengo] = useState(false);
    const [assisteOnePiece, setAssisteOnePiece] = useState(false);
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Todos os campos são obrigatórios");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não combinam");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/user`, {
                name,
                email,
                password,
                is_flamengo: isFlamengo,
                assiste_one_piece: assisteOnePiece
            });

            if (response.status === 201 || response.data.token) {
                navigate("/login");
                
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 409) {
                setError("Este email já está cadastrado");
            } else {
                setError("Erro ao registrar. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#F5DEB3" }}
        >
            <Card className="shadow-sm" style={{ width: "100%", maxWidth: "420px" }}>
                <Card.Body>
                    <Card.Title className="mb-4 text-center">Registro</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(element) => setName(element.target.value)}
                                type="text"
                                placeholder="Digite seu nome completo"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Endereço de Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(element) => setEmail(element.target.value)}
                                type="email"
                                placeholder="Digite seu email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={(element) => setPassword(element.target.value)}
                                type="password"
                                placeholder="Digite sua senha"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control
                                value={confirmPassword}
                                onChange={(element) => setConfirmPassword(element.target.value)}
                                type="password"
                                placeholder="Confirme sua senha"
                            />
                        </Form.Group>

                        <hr />
                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox"
                                id="check-flamengo"
                                label="Você é torcedor do Flamengo?"
                                checked={isFlamengo}
                                onChange={(e) => setIsFlamengo(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Check 
                                type="checkbox"
                                id="check-onepiece"
                                label="Você assiste One Piece?"
                                checked={assisteOnePiece}
                                onChange={(e) => setAssisteOnePiece(e.target.checked)}
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100 border-0"
                            style={{ backgroundColor: "#D2691E" }}
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Registrar"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;