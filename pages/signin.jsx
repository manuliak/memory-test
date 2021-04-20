import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'

import validateEmail from '../helpers/validateEmail';
import { useAuth } from '../context/AuthContext'

export default function SignIn () {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { currentUser, signIn } = useAuth();

    const emailField = useRef(null);
    const passwordField = useRef(null);

    const signInHandler = async (e) => {
        e.preventDefault();
        setErrors(null);

        const email = emailField.current.value;
        const password = passwordField.current.value;

        if(email === '') {
            setErrors('Please enter your email address');
            return;
        }

        if(!validateEmail(email)) {
            setErrors('Please enter a valid email adress');
            return;
        }

        if(password === '') {
            setErrors('Please enter your password');
            return;
        }
        
        setLoading(true);
        try {
            await signIn(email, password);
        } catch (error) {
            setErrors(error.message);
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(currentUser) {
            router.push('/profile')
        }
    }, [currentUser])

    return (
        <Row className="mt-50 justify-content-md-center">
            <Col xs lg="4">
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <div>Sign in</div>
                        <p style={{margin: 0}}>
                            or {' '}
                            <Link href="/signup">
                                <a>create an account</a>
                            </Link>
                        </p>
                    </Card.Header>
                    <Card.Body>
                        {
                            errors && errors !== '' ? (
                                <Alert variant="danger">
                                    {errors}
                                </Alert>
                            ) : ''
                        }

                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control ref={emailField} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={passwordField} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button disabled={loading} variant="primary" type="submit" className="btn-block" onClick={(e) => signInHandler(e)}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}