import { ExplorationBar } from "./ExplorationBar"
import * as React from 'react'
import { useInterval } from "./useInterval"

const Zone1 = (props) => {
    const [progression, setProgression] = React.useState<number | undefined>(undefined)
    const [isExploring, setIsExploring] = React.useState(false)
    let interval

    React.useEffect(() => {
        if (isExploring) {
            interval = setInterval(() => {
                if (progression === undefined) return
                if (progression + props.progressionPerSecond >= 100) {
                     setProgression(100)
                     endExploration()
                }
                else setProgression(progression + props.progressionPerSecond)
            }, 1000)
        }
        else if (!isExploring && progression !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [isExploring, progression])
    

    const beginExploration = () => {
        setIsExploring(true)
        setProgression(0)
    }

    const endExploration = () => {
        clearInterval(interval)
        setProgression(undefined)
        setIsExploring(false)
        props.gainGold()
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}} >
            <span>Zone 1 : La plage</span>
            <ExplorationBar progression={progression ?? 0} />
            <div>
              {isExploring && (<button onClick={() => setProgression(progression + 1)}>Click</button>)}
                <button disabled={progression !== undefined} onClick={beginExploration}>
                   Begin Exploration
                </button>
            </div>
        </div>
    )
}

export { Zone1 }