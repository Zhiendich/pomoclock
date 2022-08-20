import { useContext, useEffect, useState } from 'react'
import { TimeContext } from '../App'
const Pomoclock = () => {
    const timeContext = useContext(TimeContext)
    const [time, setTime] = useState(timeContext.work[0])
    const [defaultTime, setDefaultTime] = useState(time)
    const [buttonStart, setButtonStart] = useState(false)
    let [timeMinut, setTimeMinut] = useState(Number(time))
    const [timerId, setTimerId] = useState<NodeJS.Timer>()
    const [theme, setTheme] = useState('red')
    const [colorText, setColorText] = useState('#ec0038')
    const [activeId, setActiveId] = useState('1');
    const liValues = [
        { id: '1', text: "Фокус", mode: timeContext.work[0], backgroundColor: 'red', textColor: '#ec0038' },
        { id: '2', text: "Перерыв", mode: timeContext.shortBreak[0], backgroundColor: '#5E9CA0', textColor: '#508588' },
        { id: '3', text: "Длинный перерыв", mode: timeContext.longBreak[0], backgroundColor: '#5889AC', textColor: '#4B7592' },
    ];
    let currentTimerId: NodeJS.Timer
    useEffect(() => {
        if (time[0] === '0') {
            setTimeMinut(Number(time.slice(-2)))
        }
    }, [buttonStart])
    useEffect(() => {
        if (time.slice(-1) !== '0' && time.slice(-2) !== '0') {
            return
        }
        setTimeMinut(Number(time.slice(0, 2)) * 60)
    }, [time])
    ////////////////////////////////////////// Подумать как переписать
    useEffect(() => {
        convertTime(timeContext.shortBreak[0])
    }, [timeContext.shortBreak])
    useEffect(() => {
        convertTime(timeContext.longBreak[0])
    }, [timeContext.longBreak])
    useEffect(() => {
        convertTime(timeContext.work[0])
    }, [timeContext.work])
    //////////////////////////////////////////

    const countDown = () => {
        if (timeMinut <= 0) {
            convertTime(defaultTime)
            setButtonStart(false)
            clearInterval(currentTimerId)
            return
        }
        let seconds = timeMinut % 60
        let minutes = timeMinut / 60
        let strTimer = `${Math.trunc(minutes)}:${seconds}`;
        if (`${Math.trunc(minutes)}`.length === 1) {
            strTimer = `0${Math.trunc(minutes)}:${seconds}`;
            setTime(strTimer)
        }
        if (`${Math.trunc(seconds)}`.length === 1) {
            strTimer = `${Math.trunc(minutes)}:0${seconds}`;
            setTime(strTimer)
        }
        if (`${Math.trunc(minutes)}`.length === 1 && `${Math.trunc(seconds)}`.length === 1) {
            strTimer = `0${Math.trunc(minutes)}:0${seconds}`;
            setTime(strTimer)
        }
        if (`${Math.trunc(minutes)}`.length !== 1 && `${Math.trunc(seconds)}`.length !== 1) {
            strTimer = `${Math.trunc(minutes)}:${seconds}`;
            setTime(strTimer)
        }
        setTimeMinut(--timeMinut)
    }

    function runPeriodically(func: () => void) {
        if (typeof timerId == 'undefined') {
            func();
        }
        currentTimerId = setInterval(func, 1000);
        setTimerId(currentTimerId)
    }

    const startTimer = () => {
        setButtonStart(!buttonStart)
        if (buttonStart === true) {
            clearInterval(timerId)
            return
        }
        runPeriodically(countDown);
    }

    const changeMode = (mode: string, id: string, backgroundColor: string, textColor: string) => {
        clearInterval(timerId)
        setButtonStart(false)
        convertTime(mode)
        setDefaultTime(mode)
        setActiveId(id)
        setTheme(backgroundColor)
        setColorText(textColor)
        const sound = new Audio('http://gget.it/u1urz3zh/popsound.mp3');
        sound.load();
        sound.play();
    }

    const convertTime = (timeValue: string) => timeValue.length >= 2 ? setTime(`${timeValue}:00`) : setTime(`0${timeValue}:00`)

    return (
        <div className={`flex flex-col mt-[50px] items-center p-5 w-[500px] h-[300px]  rounded-[10px]`} style={{ background: theme }}>
            <ul className='w-[400px] mode-li flex justify-between text-[20px] '>
                {liValues.map(li => (
                    <li key={li.id} id={li.id} style={{ background: `${activeId == li.id ? colorText : ''}` }} onClick={() => changeMode(li.mode, li.id, li.backgroundColor, li.textColor)}>
                        {li.text}
                    </li>
                ))}
            </ul>
            <h1 className='time mt-[15px] text-[80px]'>{time}</h1>
            {!buttonStart && <button onClick={startTimer} className='w-[200px] bg-[white] text-[red] text-[25px] p-3 mt-5'>Начать</button>}
            {buttonStart && <button onClick={startTimer} className='w-[200px] bg-[white] text-[red] text-[25px] p-3 mt-5'>Остановить</button>}
        </div>
    )
}

export default Pomoclock