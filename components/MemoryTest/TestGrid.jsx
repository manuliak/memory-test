import React, { useContext } from 'react'
import { TestContext } from '../../context/test/testContext'

export default function TestGrid () {
    const {
        gridSize,
        modalShow,
        grid,
        visibleDigits,
        layoutContainerWidth,
        buttonVisibilityStatus,
        error,
        checkAnswer
    } = useContext(TestContext);

    return (
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
    )
}