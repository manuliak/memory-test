import React, { useState, useEffect, useContext, createContext } from 'react'
import useSound from 'use-sound';
import axios from 'axios'

import shuffleArray from '../helpers/shuffleArray'
import randomUniqueNum from '../helpers/randomUniqueNum'

import { useAuth } from '../context/AuthContext'

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
    const [testData, setTestData] = useState(null);
    const [statistic, setStatistic] = useState(null);

    const { currentUser } = useAuth();

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

    const checkAnswer = async (digit, disabled) => {
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
                const currentTime = Date.now();
                setFinishTime(currentTime);

                if(currentUser && currentUser.uid) {

                    const responseNewTest = await saveTest(currentTime - startTime);

                    if (responseNewTest.data.success) {
                        setTestData(responseNewTest.data.data);

                        const statisticResponse = await getStatistic();

                        if (statisticResponse.data.success) {
                            setStatistic(statisticResponse.data.data);
                            setModalShow(true);
                        } else {
                            console.log(statisticResponse.status);
                        }
                    } else {
                        console.log(responseNewTest.status);
                    }
                } else {
                    setModalShow(true);
                }
            }
        }
    }

    const saveTest = (answerTime) => {
        const testOptions = {
            uid: currentUser.uid,
            grid_size: gridSize,
            buttons_count: digitsNumber,
            time_to_remember: timeToRemember,
            failures: failures,
            answer_time: answerTime
        }

        return axios.post('/api/tests', testOptions)
    }

    const getTests = (uid) => {
        const testOptions = {
            uid: uid,
            is_visible: true
        }
        
        return axios.get('/api/tests', { params: testOptions })
    }

    const getStatistic = () => {
        const statisticOptions = {
            grid_size: gridSize,
            buttons_count: digitsNumber,
            time_to_remember: timeToRemember,
            is_visible: true
        }

        return axios.get('/api/statistic', { params: statisticOptions })
    }

    const updateStatistic = async () => {
        await getStatistic()
        .then(function (response) {
            if(response.data.success) {
                setStatistic(response.data.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const getTestPosition = () => {
        let position = 0;
        console.log('get position st', statistic);
        console.log('get position ts', testData);
        
        if(statistic && testData) {
            statistic.forEach((test, key) => {
                if(test._id === testData._id) {
                    position = key + 1
                }
            })
        }

        return position;
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
        setTestData(null);
        // setStatistic(null);
    }

    useEffect(() => {    
        updateStatistic();
    }, [gridSize, digitsNumber, timeToRemember]);

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
            cancelTest,
            saveTest,
            getStatistic,
            testData, setTestData,
            statistic, setStatistic,
            getTestPosition,
            getTests,
            updateStatistic
        }}>{children}</TestContext.Provider>
    )
}