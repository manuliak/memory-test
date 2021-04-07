import React, { useEffect, useState } from 'react'

import shuffleArray from '../../helpers/shuffleArray'
import useSound from 'use-sound';

export default function MemoryTest() {
    // const [answerTime, setAnswerTime] = useState(10);
    const [timeToRemember, setTimeToRemember] = useState(1000);
    const [digitsNumber, setDigitsNumber] = useState(5);
    const [visibleDigits, setVisibleDigits] = useState([]);
    const [grid, setGrid] = useState([]);
    const [buttonVisibilityStatus, setButtonVisibilityStatus] = useState(true);
    const [error, setError] = useState(null);

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

        setTimeout(() => {
            setButtonVisibilityStatus(false);
        }, timeToRemember)
    }

    const checkAnswer = (digit) => {
        setError(null);

        const buttonData = visibleDigits.find(button => !button.clickStatus);

        if(buttonData.digit !== digit) {
            setError(digit);
            errorSound();
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
        }
    }

    const cancelTest = () => {
        setGrid([]);
        setVisibleDigits([]);
        setVisibleDigits([]);
        setButtonVisibilityStatus(true);
        setError(null);
    }

    return (
        <div className="test">
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
            <div className="test__controls">
                <button onClick={() => startTest()}>
                    <span>Start Test</span>
                </button>
                <button onClick={() => cancelTest()}>
                    <span>Cancel Test</span>
                </button>
            </div>
        </div>
    )
}