import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Row, Col, Card, Button, Table } from 'react-bootstrap'

import { useAuth } from '../context/AuthContext'
import { useTest } from '../context/TestContext'

import convertTime from '../helpers/convertTime'

export default function Profile () {
    const [tests, setTests] = useState(null);
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const { currentUser } = useAuth();
    const { getTests } = useTest();


    const loadTests = async () => {
        if(currentUser && currentUser.uid) {
            try {
                const testsResporse = await getTests(currentUser.uid);
    
                if(testsResporse.data.success) {
                    setTests(testsResporse.data.data);
                }
            } catch (error) {
                console.log(error);
            }
            
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(!currentUser) {
            router.push('/signin')
        }

        loadTests();
    }, [currentUser])

    // console.log(currentUser);

    return !currentUser ? <>Profile</> : (
        <Row className="mt-50 justify-content-md-center">
            <Col xs lg="3">
                <div className="profile__avatar">
                    <Image
                        src={ currentUser && currentUser.photoURL ? currentUser.photoURL : "/images/avatar-default.jpg"}
                        width="160"
                        height="160"
                        alt=""
                    />
                </div>
                <div className="profile__username">
                    {
                        currentUser && currentUser.displayName ? currentUser.displayName : currentUser.email.split('@')[0]
                    }
                </div>
            </Col>
            <Col xs lg="9">
                <div className="profile__content">
                    {
                        loading ? ('') : (
                            <>
                                {
                                    tests && tests.length > 0 ? (
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Grid size</th>
                                                    <th>Number of buttons</th>
                                                    <th>Time to remember</th>
                                                    <th>Failures</th>
                                                    <th>Answer time</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                tests.map((test, key) => {
                                                    const date = new Date(test.date);
                                                    
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{`${Math.sqrt(test.grid_size)}x${Math.sqrt(test.grid_size)}`}</td>
                                                            <td>{test.buttons_count}</td>
                                                            <td>{test.time_to_remember} s</td>
                                                            <td>{test.failures}</td>
                                                            <td>{convertTime(test.answer_time)}</td>
                                                            <td>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                                                        </tr>
                                                    )
                                                })   
                                            }
                                            </tbody>
                                        </Table>
                                    ) : <p>No test results yet</p>
                                }
                            </>
                        )
                    }
                </div>
            </Col>
        </Row>
    )
}