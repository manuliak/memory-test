import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge } from 'react-bootstrap'
import Slider, { Range } from 'rc-slider'

import shuffleArray from '../../helpers/shuffleArray'
import convertTime from '../../helpers/convertTime'
import useSound from 'use-sound';

export default function MemoryTest() {
    // const [answerTime, setAnswerTime] = useState(10);
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

    const [errorSound] = useSound(
        './audio/incorrect.mp3',
        { volume: 0.25 }
    );

    const [successSound] = useSound(
        './audio/success.mp3',
        { volume: 0.25 }
    );

    const digitsArray = [1,2,3,4,5,6,7,8,9];

    function randomUniqueNum(range, outputCount) {

        let arr = []
        for (let i = 1; i <= range; i++) {
          arr.push(i)
        }
      
        let result = [];
      
        for (let i = 1; i <= outputCount; i++) {
          const random = Math.floor(Math.random() * (range - i));
          result.push(arr[random]);
          arr[random] = arr[range - i];
        }
      
        return result;
    }

    const startTest = () => {
        const selected = randomUniqueNum(9, digitsNumber);
        selected.sort();
        const mixedArray = shuffleArray(digitsArray);

        const gridVisibleItems = [];

        selected.forEach(element => gridVisibleItems.push({clickStatus: false, digit: element}))
        setGrid(mixedArray);
        setVisibleDigits(gridVisibleItems);

        setStartTime(Date.now());

        setTimeout(() => {
            setButtonVisibilityStatus(false);
        }, timeToRemember * 1000)
    }

    const checkAnswer = (digit) => {
        if(buttonVisibilityStatus) return;
        
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

    useEffect(() => {
        updateSlider2Markers(gridSize);
    }, [])

    return (
        <div className="test">

            <div className="filter">
                <Row>
                    <Col>
                        <div className="filter-item">
                            <div className="filter-item__head">
                                <h4>
                                    Grid size <Badge variant="info">{marks1[gridSize]}</Badge>
                                </h4>
                            </div>
                            <div className="filter-item__field">
                                <Slider min={9} max={36} marks={marks1} step={null} onChange={(value) => slider1Handler(value)} defaultValue={gridSize}/>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="filter-item">
                            <div className="filter-item__head">
                                <h4>
                                    Number of buttons <Badge variant="info">{digitsNumber}</Badge>
                                </h4>
                            </div>
                            <div className="filter-item__field">
                                <Slider min={3} max={gridSize} marks={slider2Marks} step={1} onChange={(value) => setDigitsNumber(value)} defaultValue={digitsNumber}/>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="filter-item">
                            <div className="filter-item__head">
                                <h4>
                                    Time to remember <Badge variant="info">{marks3[timeToRemember]}</Badge>
                                </h4>
                            </div>
                            <div className="filter-item__field">
                                <Slider min={1} max={10} marks={marks3} step={1} onChange={(value) => setTimeToRemember(value)} defaultValue={timeToRemember}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="test__grid">
                {
                    grid.map(element => {
                        const buttonData = visibleDigits.find(button => button.digit === element);

                        return (
                            <div className="test__grid-item" key={element}>
                                {
                                    buttonData ? (
                                        <button
                                            className={`
                                                answer-button
                                                ${!buttonVisibilityStatus ? ' answer-button--inverse' : ''}
                                                ${buttonData.clickStatus && error !== buttonData.digit ? ' answer-button--hidden' : ''}
                                                ${error === buttonData.digit ? ' answer-button--error' : ''}
                                            `}
                                            onClick={() => checkAnswer(element)}
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
            <div className="test__controls d-flex justify-content-center">
                {
                    !startTime ? (
                        <Button variant="dark" onClick={() => startTest()}><span>Start Test</span></Button>
                    ) : ''
                }
                {
                    startTime ? (
                        <button onClick={() => cancelTest()}>
                            <span>Cancel Test</span>
                        </button>
                    ) : ''
                }
            </div>
            {
                startTime ? (
                    <div>
                        <p>Failures: {failures}</p>
                    </div>
                ) : ''
            }
            {
                startTime && finishTime ? (
                    <div>
                        <p>Answer time: {convertTime(finishTime - startTime)}</p>
                    </div>
                ) : ''
            }
        </div>
    )
}