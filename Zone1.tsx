import * as React from 'react'
import { ExplorationBar } from './ExplorationBar'

const Zone = (props) => {
    const [progression, setProgression] =
        React.useState<number | undefined>(undefined)
    const [timedProgression, setTimedProgression] = React.useState(0)
    const [clickedProgression, setClickedProgression] = React.useState(0)
    const [isExploring, setIsExploring] = React.useState(false)
    let interval

    React.useEffect(() => {
        if (isExploring) {
            interval = setInterval(() => {
                setTimedProgression(
                    timedProgression + props.progressionPerSecond
                )
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isExploring, timedProgression])

    React.useEffect(() => {
        if (timedProgression + clickedProgression >= 100) {
            setProgression(100)
            endExploration()
        } else setProgression(timedProgression + clickedProgression)
    }, [timedProgression, clickedProgression])

    const beginExploration = () => {
        setIsExploring(true)
        setProgression(0)
    }

    const endExploration = () => {
        clearInterval(interval)
        setTimedProgression(0)
        setClickedProgression(0)
        setProgression(undefined)
        setIsExploring(false)
        props.gainReward()
        props.automated && beginExploration()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
                Zone {props.zoneNumber} : {props.zoneName}
            </span>
            <ExplorationBar progression={progression} color={props.color} />
            <div>
                <button
                    disabled={!isExploring}
                    onClick={() =>
                        setClickedProgression(clickedProgression + 1)
                    }
                >
                    Fouiller
                </button>
                <button disabled={isExploring} onClick={beginExploration}>
                    Commencer l'exploration
                </button>
            </div>
        </div>
    )
}

export { Zone }
