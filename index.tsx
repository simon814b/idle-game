import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Items } from './Items'
import { useInterval } from './useInterval'
import { Zone } from './Zone1'

interface Effect {
    effect: string
    baseValue: number
}

interface Item {
    name: string
    zone: string
    effect: Effect
}

export interface ItemObject extends Item {
    quality: string
}

const App = () => {
    const [gold, setGold] = React.useState(0)
    const [goldPerSecond, setGoldPerSecond] = React.useState(0)
    const [progressionPerSecond, setProgressionPerSecond] = React.useState(1)
    const [endGame, setEndGame] = React.useState(false)
    const [items, setItems] = React.useState<{ [name: string]: ItemObject }>({})
    const [isForetAvailable, setIsForetAvailable] = React.useState(false)
    const [logs, setLogs] = React.useState([])
    const [isPlageAutomated, setIsPlageAutomated] = React.useState(false)
    const [isForetAutomated, setIsForetAutomated] = React.useState(false)
    useInterval(
        () => setGold(Math.round((gold + goldPerSecond) * 100) / 100),
        1000
    )

    React.useEffect(() => {
        if (Object.values(items).length === 4) {
            setEndGame(true)
        }
    }, [items])

    React.useEffect(() => {
        let gps = 0
        Object.values(items).forEach((item) => {
            if (item.effect.effect === '+g/s') gps = gps + item.effect.baseValue
        })
        Object.values(items).forEach((item) => {
            if (item.effect.effect === 'boostAll')
                gps = gps * item.effect.baseValue
        })
        setGoldPerSecond(Math.round(gps * 100) / 100)
    }, [items])

    const itemsList = [
        {
            name: 'Joli Coquillage',
            zone: 'Plage',
            effect: { effect: '+g/s', baseValue: 0.1 },
        },
        {
            name: 'Fossile',
            zone: 'Plage',
            effect: { effect: '+g/s', baseValue: 0.2 },
        },
        {
            name: "Machoire d'ours prehistorique",
            zone: 'Foret',
            effect: { effect: '+g/s', baseValue: 1 },
        },
        {
            name: 'Casque de soldat',
            zone: 'Foret',
            effect: { effect: '+g/s', baseValue: 2 },
        },
        {
            name: 'Ecaille mysterieuse',
            zone: 'All',
            effect: { effect: 'boostAll', baseValue: 2 },
        },
    ]

    const gainItem = (zone: string) => {
        if (zone === 'Plage') {
            if (Math.random() > 0.75)
                return {
                    name: 'Fossile',
                    zone: 'Plage',
                    effect: { effect: '+g/s', baseValue: 0.2 },
                }
            if (endGame && Math.random() > 0.9)
                return {
                    name: 'Ecaille mysterieuse',
                    zone: 'All',
                    effect: { effect: 'boostAll', baseValue: 1.1 },
                }
            return {
                name: 'Joli Coquillage',
                zone: 'Plage',
                effect: { effect: '+g/s', baseValue: 0.1 },
            }
        }
        if (zone === 'Foret') {
            if (Math.random() > 0.8)
                return {
                    name: 'Casque de soldat',
                    zone: 'Foret',
                    effect: { effect: '+g/s', baseValue: 2 },
                }
            if (endGame && Math.random() > 0.8)
                return {
                    name: 'Ecaille mysterieuse',
                    zone: 'All',
                    effect: { effect: 'boostAll', baseValue: 1.1 },
                }
            return {
                name: "Machoire d'ours prehistorique",
                zone: 'Foret',
                effect: { effect: '+g/s', baseValue: 1 },
            }
        }
    }

    const addItem = (item: Item) => {
        const ownedItem = Object.values(items).find((i) => i.name === item.name)
        const itemQualityNumber = Math.random()
        const itemQuality = //mettre un switch
            itemQualityNumber < 0.75
                ? 'Usé'
                : itemQualityNumber < 0.9
                ? 'Bon'
                : itemQualityNumber < 0.97
                ? 'Excellent'
                : 'Legendaire'
        if (
            !ownedItem ||
            (ownedItem &&
                qualityToNumber(ownedItem.quality) <
                    qualityToNumber(itemQuality))
        ) {
            const newEffect = {
                effect: item.effect.effect,
                baseValue:
                    Math.round(
                        item.effect.baseValue *
                            qualityToCoeff(itemQuality) *
                            100
                    ) / 100,
            }
            const newItem = {
                name: item.name,
                zone: item.zone,
                effect: newEffect,
                quality: itemQuality,
            }
            setItems({ ...items, [item.name]: newItem })
            setLogs([
                ...logs,
                `Vous avez découvert '${item.name}' en qualité '${itemQuality}' !`,
            ])
        } else {
            setLogs([
                ...logs,
                `Vous avez découvert '${item.name}' en qualité '${itemQuality}' que vous aviez déjà ou en meilleure qualité...`,
            ])
        }
    }

    const qualityToNumber = (quality: string) => {
        switch (quality) {
            case 'Usé':
                return 1
            case 'Bon':
                return 2
            case 'Excellent':
                return 3
            case 'Legendaire':
                return 4
            default:
                return 0
        }
    }

    const qualityToCoeff = (quality: string) => {
        switch (quality) {
            case 'Usé':
                return 1
            case 'Bon':
                return 1.25
            case 'Excellent':
                return 1.5
            case 'Legendaire':
                return 2
            default:
                return 0
        }
    }

    const gainReward = (zone: string) => {
        if (Math.random() > 0.75) {
            const itemReward = gainItem(zone)
            addItem(itemReward)
        } else {
            gainGold(zoneToZoneNumber(zone))
        }
    }

    const zoneToZoneNumber = (zone: string) => {
        switch (zone) {
            case 'Plage':
                return 1
            case 'Foret':
                return 2
            default:
                return 0
        }
    }

    const gainGold = (zoneNumber: number) => {
        const gainedGold = Math.floor(Math.random() * 10) * zoneNumber ** 2
        setGold(gold + gainedGold)
        setLogs([...logs, `Vous avez trouvé ${gainedGold} gold !`])
    }

    const upgrade = () => {
        setGold(
            gold - Math.floor(Math.exp(progressionPerSecond) ** (1 / 4)) - 3
        )
        setProgressionPerSecond(progressionPerSecond + 1)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
                style={{
                    flexGrow: 2,
                    height: '80vh',
                    padding: '10px',
                    margin: '10px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    backgroundColor: '#f9f1f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <span>
                        Vous avez {gold} gold! (+ {goldPerSecond}/s)
                    </span>
                    <div
                        style={{
                            margin: '20px',
                            padding: '20px',
                            border: '1px solid black',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                        }}
                    >
                        <Zone
                            zoneName="La Plage"
                            zoneNumber="1"
                            progressionPerSecond={progressionPerSecond}
                            gainReward={() => gainReward('Plage')}
                            automated={isPlageAutomated}
                            color="#FEDE00"
                        />
                        {isForetAvailable ? (
                            <Zone
                                zoneName="La Foret"
                                zoneNumber="2"
                                progressionPerSecond={
                                    progressionPerSecond * 0.2
                                }
                                gainReward={() => gainReward('Foret')}
                                automated={isForetAutomated}
                                color="#009B81"
                            />
                        ) : (
                            <button
                                style={{ marginTop: '10px' }}
                                disabled={gold < 500}
                                onClick={() => {
                                    setGold(gold - 500)
                                    setIsForetAvailable(true)
                                }}
                            >
                                Acheter un scooter pour aller dans la forêt.
                                (500 gold)
                            </button>
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}
                    >
                        <button
                            disabled={
                                gold <
                                Math.floor(
                                    Math.exp(progressionPerSecond) ** (1 / 4)
                                ) +
                                    3
                            }
                            onClick={upgrade}
                        >
                            Améliorer votre rapidité de recherche{' '}
                            {Math.floor(
                                Math.exp(progressionPerSecond) ** (1 / 4)
                            ) + 3}{' '}
                            gold.
                        </button>
                        <button
                            disabled={gold < 50}
                            onClick={() => {
                                setGold(gold - 50)
                                setIsPlageAutomated(true)
                            }}
                        >
                            Embaucher son pote Tim pour chercher sur la plage.
                            (50 gold)
                        </button>
                        {isForetAvailable && (
                            <button
                                disabled={gold < 2000}
                                onClick={() => {
                                    setGold(gold - 2000)
                                    setIsForetAutomated(true)
                                }}
                            >
                                Embaucher le grand frère de Tim pour chercher
                                dans la forêt. (2000 gold)
                            </button>
                        )}
                    </div>
                </div>
                <div
                    style={{
                        margin: '20px',
                        padding: '20px',
                        border: '1px solid black',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                        Découvertes
                    </span>
                    {logs.slice(-5).map((log) => (
                        <span>{log}</span>
                    ))}
                </div>
            </div>
            <div
                style={{
                    flexGrow: 1,
                    height: '80vh',
                    padding: '10px',
                    margin: '10px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    backgroundColor: '#f9f1f0',
                }}
            >
                <Items items={Object.values(items)} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
