import React from 'react'

export default function GridPlaceholder ({containerWidth, size}) {

    const gridMap = [];

    for (let index = 1; index <= Math.pow(size, 2); index++) {
        gridMap.push(index);
    }

    const itemSize = containerWidth / size;
    const styles = containerWidth > 0 ? {width: `${itemSize}px`, height: `${itemSize}px`} : {}

    return (
        <div className={`grid-placeholder grid-placeholder--size-${size}`}>
            {
                gridMap.map((item) => {
                    return (
                        <div style={styles} className={`grid-placeholder__item`} key={`placeholder-${item}`}><span>{item}</span></div>
                    )
                })
            }
        </div>
    )
}