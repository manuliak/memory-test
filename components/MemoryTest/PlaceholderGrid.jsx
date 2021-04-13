import React, { useContext } from 'react'
import { TestContext } from '../../context/test/testContext'

export default function PlaceholderGrid () {
    const {
        gridSize,
        layoutContainerWidth,
    } = useContext(TestContext);

    const gridMap = [];

    for (let index = 1; index <= gridSize; index++) {
        gridMap.push(index);
    }

    const itemSize = layoutContainerWidth / Math.sqrt(gridSize);
    const styles = layoutContainerWidth > 0 ? {width: `${itemSize}px`, height: `${itemSize}px`} : {}

    return (
        <div className="test__placeholder">
            <div className={`grid-placeholder grid-placeholder--size-${Math.sqrt(gridSize)}`}>
                {
                    gridMap.map((item) => {
                        return (
                            <div style={styles} className={`grid-placeholder__item`} key={`placeholder-${item}`}><span>{item}</span></div>
                        )
                    })
                }
            </div>
        </div>
    )
}