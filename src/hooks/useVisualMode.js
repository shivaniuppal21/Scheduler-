import { useState } from 'react';


const useVisualMode = (initial) => {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); 

const transition = (newMode, replace = false) => {
        if (replace) {
            setHistory([...history.slice(0,-1), newMode])
        }else{
            setHistory([...history, newMode])
        }
        setMode(newMode)
      };

function back() { 
    const newHistory = history.length > 1 ? [...history.slice(0,-1)] : [...history]
    setHistory(newHistory)
    setMode(newHistory[newHistory.length-1])
}

  return {mode, transition, back}
}
  export default useVisualMode;