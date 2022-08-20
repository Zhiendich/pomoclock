import React, { Dispatch, SetStateAction, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Pomoclock from './components/Pomoclock';


export type TimeProps = {
  work: [string, Dispatch<SetStateAction<string>>],
  shortBreak: [string, Dispatch<SetStateAction<string>>],
  longBreak: [string, Dispatch<SetStateAction<string>>],
}
export const TimeContext = React.createContext({} as TimeProps);
function App() {
  const [work, setWork] = useState('60')
  const [shortBreak, setShortBreak] = useState('10')
  const [longBreak, setLongBreak] = useState('30')
  return (
    <TimeContext.Provider value={{ work: [work, setWork], shortBreak: [shortBreak, setShortBreak], longBreak: [longBreak, setLongBreak] }}>
      <div className="flex flex-col items-center pt-4 ">
        <Header />
        <Pomoclock />
      </div>
    </TimeContext.Provider>
  );
}

export default App;
