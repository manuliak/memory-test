import React from 'react'

export default function GridPlaceholder ({size}) {

    const gridMap = [];

    for (let index = 1; index <= Math.pow(size, 2); index++) {
        gridMap.push(index);
    }

    return (
        <div className={`grid-placeholder grid-placeholder--size-${size}`}>
            {
                gridMap.map((item) => {
                    return (
                        <div className={`grid-placeholder__item`} key={`placeholder-${item}`}><span>{item}</span></div>
                    )
                })
            }
        </div>
    )
}