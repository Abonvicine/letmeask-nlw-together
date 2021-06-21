import {useState} from 'react'

export function Button(){

    const [counter, setCounter] = useState(0);

    function attCounter(){
        setCounter(counter + 1);
    }
    function rstCounter(){
        setCounter(0)
    }
    return(
        <div>
            <button onClick ={attCounter}>{counter}</button>
            <button onClick ={rstCounter}>Resetar</button>
        </div>
    )
}