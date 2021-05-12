import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useInterval } from './useInterval'
import { Zone1 } from './Zone1'

const App = () => {
    const [gold, setGold] = React.useState(0)
    const [goldPerSecond, setGoldPerSecond] = React.useState(0)
    const [progressionPerSecond, setProgressionPerSecond] = React.useState(5)
    useInterval(() => setGold(gold + goldPerSecond), 1000)

    const gainGold = () => {
        const gainedGold = Math.floor(Math.random()*10)
        setGold(gold + gainedGold)
        window.alert(`You gained ${gainedGold} gold!`)
    }

    const upgrade = () => {
        setGold(gold - Math.floor(Math.exp(progressionPerSecond)))
        setProgressionPerSecond(progressionPerSecond + 1)
    }

    return <div>
        <span>Hello world!</span>
        <span>You have {gold} gold!</span>
        <Zone1 progressionPerSecond={progressionPerSecond} gainGold={gainGold}/>
        <button disabled={gold < Math.floor(Math.exp(progressionPerSecond))} onClick={upgrade}>
            Upgrade your research rate for {Math.floor(Math.exp(progressionPerSecond))} gold. 
        </button>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)