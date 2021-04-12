import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Button, Badge, Collapse } from 'react-bootstrap'
import Slider from 'rc-slider'
import useSound from 'use-sound';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH} from '@fortawesome/free-solid-svg-icons'

import shuffleArray from '../../helpers/shuffleArray'
import convertTime from '../../helpers/convertTime'
import randomUniqueNum from '../../helpers/randomUniqueNum'
import GridPlaceholder from './GridPlaceholder'
import ResultModal from './ResultModal'

export default function MemoryTest() {
    const [timeToRemember, setTimeToRemember] = useState(1);
    const [digitsNumber, setDigitsNumber] = useState(5);
    const [visibleDigits, setVisibleDigits] = useState([]);
    const [grid, setGrid] = useState([]);
    const [buttonVisibilityStatus, setButtonVisibilityStatus] = useState(true);
    const [error, setError] = useState(null);
    const [failures, setFailures] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finishTime, setFinishTime] = useState(null);
    const [gridSize, setGridSize] = useState(16);
    const [slider2Marks, setSlider2Marks] = useState({});
    const [modalShow, setModalShow] = React.useState(false);

    const [layoutContainerWidth, setLayoutContainerWidth] = useState(0);

    const [openFilter, setOpenFilter] = useState(false);


    const layoutContainer = useRef(null);

    const [errorSound] = useSound(
        './audio/incorrect.mp3',
        { volume: 0.25 }
    );

    const [successSound] = useSound(
        './audio/success.mp3',
        { volume: 0.25 }
    );

    function compareNumbers(a, b) {
        return a - b;
    }

    const startTest = () => {
        const gridMap = [];

        for (let index = 1; index <= gridSize; index++) {
            gridMap.push(index);
        }

        const selected = randomUniqueNum(gridSize, digitsNumber);
        selected.sort(compareNumbers);
        const mixedArray = shuffleArray(gridMap);

        const gridVisibleItems = [];

        selected.forEach(element => gridVisibleItems.push({clickStatus: false, digit: element}))
        setGrid(mixedArray);
        setVisibleDigits(gridVisibleItems);

        setStartTime(Date.now());

        setTimeout(() => {
            setButtonVisibilityStatus(false);
        }, timeToRemember * 1000)
    }

    const checkAnswer = (digit, disabled) => {
        if(buttonVisibilityStatus || disabled) return;
        
        setError(null);

        const buttonData = visibleDigits.find(button => !button.clickStatus);

        if(buttonData.digit !== digit) {
            setError(digit);
            errorSound();
            setFailures(prevFailuresNumber => prevFailuresNumber + 1);
        } else {
            let changedData = [];

            visibleDigits.forEach(element => {
                if(element.digit === buttonData.digit) {
                    changedData.push({...element, clickStatus: true });
                } else {
                    changedData.push(element);
                }
            });

            successSound();
            setVisibleDigits(changedData);

            const clickedButtons = changedData.filter(button => button.clickStatus);

            if(clickedButtons.length === visibleDigits.length) {
                setFinishTime(Date.now());
                setModalShow(true);
            }
        }
    }

    const cancelTest = () => {
        setGrid([]);
        setVisibleDigits([]);
        setVisibleDigits([]);
        setButtonVisibilityStatus(true);
        setError(null);
        setFailures(0);
        setStartTime(null);
        setFinishTime(null);
        setModalShow(false);
    }
    
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

    const updateDimensions = () => {
        const width = layoutContainer.current && window.outerWidth <= 767 ? layoutContainer.current.offsetWidth : 0;
        setLayoutContainerWidth(width);
    }

    useEffect(() => {
        updateSlider2Markers(gridSize);
        
        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [])

    return (
        <div className="test" ref={layoutContainer}>

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
                                        Test options
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
                                            Grid size <Badge variant="info">{marks1[gridSize]}</Badge>
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
                                            Number of buttons <Badge variant="info">{digitsNumber}</Badge>
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
                                            Time to remember <Badge variant="info">{marks3[timeToRemember]}</Badge>
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

            {
                startTime ? (
                    <div className={`test-grid test-grid--size-${Math.sqrt(gridSize)} ${modalShow ? 'test-grid--hidden' : ''}`}>
                        {
                            grid.map(element => {
                                const buttonData = visibleDigits.find(button => button.digit === element);
                                const status = buttonData && buttonData.clickStatus && error !== buttonData.digit;

                                const itemSize = layoutContainerWidth / Math.sqrt(gridSize);

                                const styles = layoutContainerWidth > 0 ? {width: `${itemSize}px`, height: `${itemSize}px`} : {}

                                return (
                                    <div className="test-grid__item" key={element} style={styles}>
                                        {
                                            buttonData ? (
                                                <button
                                                    className={`
                                                        answer-button
                                                        ${!buttonVisibilityStatus ? ' answer-button--inverse' : ''}
                                                        ${status ? ' answer-button--hidden' : ''}
                                                        ${error === buttonData.digit ? ' answer-button--error' : ''}
                                                    `}
                                                    onClick={() => checkAnswer(element, status)}
                                                >
                                                    <span className="answer-button__label">
                                                        {element}
                                                    </span>
                                                </button>
                                            ) : ''
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="test__placeholder">
                        <GridPlaceholder containerWidth={layoutContainerWidth} size={Math.sqrt(gridSize)} />
                    </div>
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

            <ResultModal
                show={modalShow}
                failures={failures}
                answerTime={convertTime(finishTime - startTime)}
                onHide={() => cancelTest(false)}
            />
        </div>
    )
}