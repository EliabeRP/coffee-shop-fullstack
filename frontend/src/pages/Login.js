import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#F5DEB3" }}
        >
            <Card className="shadow-sm" style={{ width: "100%", maxWidth: "420px" }}>
                <Card.Body>
                    <Card.Title className="mb-4 text-center">Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Endereço de Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(element) => setEmail(element.target.value)}
                                type="email"
                                placeholder="Digite seu email"
                            />
                            <Form.Text className="text-muted">
                                Nós nunca vamos compartilhar seu email com mais ninguém.
                            </Form.Text>
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

                        <Button
                            type="submit"
                            className="w-100 border-0"
                            style={{ backgroundColor: "#D2691E" }}
                        >
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
