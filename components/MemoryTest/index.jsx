import React, { useEffect, useState, useRef } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

import { useTest } from '../../context/TestContext'

import PlaceholderGrid from './PlaceholderGrid'
import TestGrid from './TestGrid'
import ResultModal from './ResultModal'
import Filter from './Filter'

import convertTime from '../../helpers/convertTime'

export default function MemoryTest() {
    const { t, i18n } = useTranslation();

    const {
        startTest,
        cancelTest,
        startTime,
        modalShow,
        setLayoutContainerWidth,
        statistic
    } = useTest();

    const layoutContainer = useRef(null);

    const updateDimensions = () => {
        const width = layoutContainer.current && window.outerWidth <= 767 ? layoutContainer.current.offsetWidth : 0;
        setLayoutContainerWidth(width);
    }

    useEffect(() => {    
        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div className="test" ref={layoutContainer}>

            <Filter />

            {
                startTime ? (
                    <TestGrid />
                ) : (
                    <PlaceholderGrid/>
                )
            }

            <div className={`test__controls d-flex justify-content-center ${modalShow ? 'test__controls--hidden' : ''}`}>
                {
                    startTime ? (
                        <Button variant="danger" className="btn-lg" onClick={() => cancelTest()}><span>{t('cancelButtonLabel')}</span></Button>
                    ) : (
                        <Button variant="dark" className="btn-lg" onClick={() => startTest()}><span>{t('playButtonLabel')}</span></Button>
                    )
                }
            </div>

            <ResultModal />

            {
                statistic && statistic.length > 0 ? (                      
                    <div className="test__statistic">
                        <h2>Best results</h2>
                        <Row className="mt-50 justify-content-md-center">
                            <Col xs lg="12">
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
                                            statistic.map((test, key) => {
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
                            </Col>
                        </Row>
                    </div>
                ) : ''
            }
        </div>
    )
}