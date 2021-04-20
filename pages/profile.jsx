import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../context/AuthContext'

export default function Profile () {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { currentUser } = useAuth();

    useEffect(()=>{
        if(!currentUser) {
            router.push('/signin')
        }
    }, [currentUser])

    return (
        <Row className="mt-50 justify-content-md-center">
            
            <Col xs lg="12">
                {
                    currentUser ? JSON.stringify(currentUser.uid) : ''
                }
            </Col>
        </Row>
    )
}