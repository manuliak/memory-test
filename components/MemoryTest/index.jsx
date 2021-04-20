import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

import { useTest } from '../../context/TestContext'

import PlaceholderGrid from './PlaceholderGrid'
import TestGrid from './TestGrid'
import ResultModal from './ResultModal'
import Filter from './Filter'

export default function MemoryTest() {
    const { t, i18n } = useTranslation();

    const {
        startTest,
        cancelTest,
        startTime,
        modalShow,
        setLayoutContainerWidth
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
        </div>
    )
}