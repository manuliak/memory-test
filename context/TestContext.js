import React, { useState, useContext, createContext } from 'react'
import useSound from 'use-sound';

import shuffleArray from '../helpers/shuffleArray'
import randomUniqueNum from '../helpers/randomUniqueNum'

const TestContext = createContext();

export function useTest () {
    return useContext(TestContext);
}

export const TestState = ({children}) => {
    const [layoutContainerWidth, setLayoutContainerWidth] = useState(0);
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
    const [modalShow, setModalShow] = useState(false);

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

    return (
        <TestContext.Provider value={{
            layoutContainerWidth,
            setLayoutContainerWidth,
            timeToRemember,
            setTimeToRemember,
            digitsNumber,
            setDigitsNumber,
            visibleDigits, setVisibleDigits,
            grid, setGrid,
            buttonVisibilityStatus, setButtonVisibilityStatus,
            error, setError,
            failures, setFailures,
            startTime, setStartTime,
            finishTime, setFinishTime,
            gridSize, setGridSize,
            modalShow, setModalShow,
            startTest,
            checkAnswer,
            cancelTest
        }}>{children}</TestContext.Provider>
    )
}