import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Badge, Collapse } from 'react-bootstrap'
import Slider from 'rc-slider'

import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH} from '@fortawesome/free-solid-svg-icons'

import { useTest } from '../../context/TestContext'

export default function Filter () {
    const { t, i18n } = useTranslation();

    const {
        gridSize,
        digitsNumber,
        setDigitsNumber,
        setTimeToRemember,
        timeToRemember,
        setGridSize
    } = useTest();

    const [openFilter, setOpenFilter] = useState(false);
    const [slider2Marks, setSlider2Marks] = useState({});

    const marks1 = {
        9: '3x3',
        16: '4x4',
        25: '5x5',
        36: '6x6',
    };

    const marks3 = {
        1: '1s',
        2: '2s',
        3: '3s',
        4: '4s',
        5: '5s',
        6: '6s',
        7: '7s',
        8: '8s',
        9: '9s',
        10: '10s'
    };

    const slider1Handler = (value) => {
        setGridSize(value)

        updateSlider2Markers(value);
        if(digitsNumber > value) {
            setDigitsNumber(value);
        }
    }

    const updateSlider2Markers = (maxNum) => {
        let marks2 = {};

        for (let index = 3; index <= maxNum; index++) {

            if(maxNum > 16) {
                if(index%2 === 0) {
                    marks2[index] = index;
                }
            } else {
                marks2[index] = index;
            }
            
        }

        setSlider2Marks(marks2);
    }
    useEffect(() => {
        updateSlider2Markers(gridSize);
    }, [])

    return (
        <div className="filter">
            <div className="filter__header">
                <Row>
                    <Col>
                        <div className="filter-toggle-button">
                            <Button
                                variant={openFilter ? "secondary" : "light"}
                                onClick={() => setOpenFilter(!openFilter)}
                                aria-controls="filter-body"
                                aria-expanded={openFilter}
                            >
                                <span>
                                    {t('testOptionsButtonLabel')}
                                </span>
                                <FontAwesomeIcon icon={faSlidersH} size="xs" />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Collapse in={openFilter}>
                <div className="filter__body" id="filter-body">
                    <Row>
                        <Col lg={4}>
                            <div className="filter-item">
                                <div className="filter-item__head">
                                    <h5>
                                        {t('filterGridSizeTitle')} <Badge variant="info">{marks1[gridSize]}</Badge>
                                    </h5>
                                </div>
                                <div className="filter-item__field">
                                    <Slider min={9} max={36} marks={marks1} step={null} onChange={(value) => slider1Handler(value)} defaultValue={gridSize}/>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="filter-item">
                                <div className="filter-item__head">
                                    <h5>
                                        {t('filterGridButtonsNumberTitle')} <Badge variant="info">{digitsNumber}</Badge>
                                    </h5>
                                </div>
                                <div className="filter-item__field">
                                    <Slider min={3} max={gridSize} marks={slider2Marks} step={1} onChange={(value) => setDigitsNumber(value)} defaultValue={digitsNumber}/>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="filter-item">
                                <div className="filter-item__head">
                                    <h5>
                                        {t('filterGridTimeToRememberTitle')} <Badge variant="info">{marks3[timeToRemember]}</Badge>
                                    </h5>
                                </div>
                                <div className="filter-item__field">
                                    <Slider min={1} max={10} marks={marks3} step={1} onChange={(value) => setTimeToRemember(value)} defaultValue={timeToRemember}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Collapse>
        </div>
    )
}