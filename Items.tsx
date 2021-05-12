import * as React from 'react'
import { ItemObject } from './index'

interface ItemsProps {
    items: ItemObject[]
}

const Items = (props: ItemsProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ textAlign: 'center' }}>Objets</span>
            <div style={{ margin: '20px', padding: '20px' }}>
                {props.items.map((item) => (
                    <div
                        style={{
                            margin: '10px',
                            padding: '10px',
                            border: '1px solid black',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <span>{item.name}</span>
                        <span>Zone : {item.zone}</span>
                        <span>Qualité : {item.quality}</span>
                        <span>
                            Effet :{' '}
                            {item.effect.effect === '+g/s'
                                ? `+ ${item.effect.baseValue} gold per second`
                                : item.effect.effect === 'boostAll'
                                ? `x ${item.effect.baseValue} to all your items ! `
                                : 'Not Found'}{' '}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Items }
