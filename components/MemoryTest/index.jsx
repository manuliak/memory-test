import React, { useEffect, useState, useRef, useContext } from 'react'
import { Button } from 'react-bootstrap'

import { TestContext } from '../../context/test/testContext'

import PlaceholderGrid from './PlaceholderGrid'
import TestGrid from './TestGrid'
import ResultModal from './ResultModal'
import Filter from './Filter'

export default function MemoryTest() {

    const {
        startTest,
        cancelTest,
        startTime,
        modalShow,
        setLayoutContainerWidth
    } = useContext(TestContext);

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
                        <Button variant="danger" className="btn-lg" onClick={() => cancelTest()}><span>Cancel Test</span></Button>
                    ) : (
                        <Button variant="dark" className="btn-lg" onClick={() => startTest()}><span>Start Test</span></Button>
                    )
                }
            </div>

            <ResultModal />
        </div>
    )
}