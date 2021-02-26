import { useState } from 'react';
// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property


const useVisualMode = (initial) => {
    //const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); 
 // allows to transition to a new mode
const transition = (newMode, replace = false) => {
        if (replace) {
            setHistory(history =>[...history.slice(0,-1), newMode])
        }else{
            setHistory(history => [...history, newMode])
        }
        //setMode(newMode)
      };
 // allows to call back to return to previous mode
function back() { 
    //make a copy of history array and added newMode element
    setHistory(history => history.length > 1 ? [...history.slice(0,-1)] : [...history])
    
}
  return {mode:history[history.length -1], transition, back}
}
  export default useVisualMode;