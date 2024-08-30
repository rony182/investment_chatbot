import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleQuery = async () => {
        try {
            const result = await axios.post('https://investment-api-d5o3.onrender.com/query/', {
                query: query,
                max_tokens: 300,
                temperature: 0.5,
                top_p: 0.95
            });
            setResponse(result.data.response);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Finance Chatbot</Card.Title>
                            <Form>
                                <Form.Group controlId="queryInput">
                                    <Form.Label>Enter your query</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={query} 
                                        onChange={(e) => setQuery(e.target.value)} 
                                        placeholder="Ask about investments, finance, etc."
                                    />
                                </Form.Group>
                                <Button variant="primary" className="mt-3 w-100" onClick={handleQuery}>
                                    Ask
                                </Button>
                            </Form>
                            <div className="mt-4">
                                <h5>Response:</h5>
                                <Card className="p-3 bg-light">
                                    <p>{response}</p>
                                </Card>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Chatbot;
