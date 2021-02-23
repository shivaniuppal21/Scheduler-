import { useState } from 'react';


const useVisualMode = (initial) => {
    //const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); 

const transition = (newMode, replace = false) => {
        if (replace) {
            setHistory(history =>[...history.slice(0,-1), newMode])
        }else{
            setHistory(history => [...history, newMode])
        }
        //setMode(newMode)
      };

function back() { 
    //const newHistory = history.length > 1 ? [...history.slice(0,-1)] : [...history]
    setHistory(history => history.length > 1 ? [...history.slice(0,-1)] : [...history])
    //setMode(newHistory[newHistory.length-1])
}

  return {mode:history[history.length -1], transition, back}
}
  export default useVisualMode;