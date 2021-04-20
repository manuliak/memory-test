import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import validateEmail from '../helpers/validateEmail';
import { useAuth } from '../context/AuthContext'

export default function SignUp () {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { currentUser, signUp } = useAuth();

    const emailField = useRef(null);
    const passwordField = useRef(null);
    const confirmPasswordField = useRef(null);

    const signUpHandler = async (e) => {
        e.preventDefault();
        setErrors(null);

        const email = emailField.current.value;
        const password = passwordField.current.value;
        const confirmPassword = confirmPasswordField.current.value;

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

        if(confirmPassword === '') {
            setErrors('Please confirm your password');
            return;
        }

        if(confirmPassword !== password) {
            setErrors('Password and confirmation do not match');
            return;
        }
        
        setLoading(true);
        try {
            await signUp(email, password);
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
        <Row className="m-50 justify-content-md-center">
            
            <Col xs lg="4">
                <Card>
                    <Card.Header>
                        <div>Sign Up</div>
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
                            <Form.Group controlId="formBasicPasswordConfirmation">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control ref={confirmPasswordField} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button disabled={loading} variant="primary" type="submit" className="btn-block" onClick={(e) => signUpHandler(e)}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}