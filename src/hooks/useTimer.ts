import React from 'react';

const useTimer = (intitalValue: number = 0, type: 'INCREMENT'| 'DECREMENT' = 'INCREMENT') => {
const [currentValue, setCurrentValue] = React.useState(intitalValue);
const [isRunning, setIsRunning] = React.useState(false);
const timerRef = React.useRef<ReturnType<typeof setInterval>>();

const start = () => {
     setIsRunning(true);
};

const stop = () => {
    setIsRunning(false);
    setCurrentValue(0);
};


React.useEffect(() => {
    if(isRunning){
    timerRef.current = setInterval(() =>  setCurrentValue(value => {
        if(type === 'DECREMENT'){
         return    value - 50;
        }
        return value + 50;
    }),50);
    }

    return () => clearInterval(timerRef.current);

},[isRunning, type]);

React.useEffect(() => {
if( isRunning && currentValue <= 0 && type === 'DECREMENT' ){
    setIsRunning(false);
}

},[currentValue, isRunning, type]);

const pause = () => {
  setIsRunning(false);
  clearInterval(timerRef.current);
};

const formatNumber = (value: number, minimumIntegerDigits = 2) =>
        { return value.toLocaleString('en-US', {
            minimumIntegerDigits, useGrouping: false,
        }); };

const getFormattedTime = () => {
    const milliseconds = currentValue % 1000;
    const totalSeconds = Math.floor(currentValue / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(milliseconds)}`;
};

return { start, stop, pause, currentValue, getFormattedTime, isRunning};

};


export default useTimer;
