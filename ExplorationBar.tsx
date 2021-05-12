import * as React from 'react'

const ExplorationBar = (props) => {
    return (
        <div style={{ width: '30%', position: 'relative' }}>
            <div
                style={{
                    width: `${props.progression}%`,
                    backgroundColor: props.color,
                    minHeight: '15px',
                }}
            >
                <span
                    style={{
                        color: 'grey',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%)',
                    }}
                >{`${props.progression}%`}</span>
            </div>
        </div>
    )
}

export { ExplorationBar }
