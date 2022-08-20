import React, { ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from 'react'
import { TimeContext } from '../App'
import Input from '../UI/Input'

interface FormProps {
    show: boolean
    setShowForm: (show: boolean) => void
}
const Form = ({ show, setShowForm }: FormProps) => {
    const timeContext = useContext(TimeContext)
    const [work, setWork] = timeContext.work
    const [shortBreak, setShortBreak] = timeContext.shortBreak
    const [longBreak, setLongBreak] = timeContext.longBreak
    const acceptChange = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowForm(false)
    }
    return (
        <div className={` ${show ? 'flex' : 'hidden'} w-full h-screen  justify-center items-center  bg-[#E6E0D4] bg-opacity-90 fixed top-0 left-0`}>
            <form className={` bg-white w-[400px]  p-5 h-[435px] text-black flex flex-col relative `}>
                <span onClick={() => setShowForm(false)} className='close'></span>
                <h2 className='mb-2 mt-2 text-[20px]'>Настройки времени</h2>
                <hr className='mb-4' />
                <h2 >Фокус</h2>
                <Input value={work} onChange={(e: ChangeEvent<HTMLInputElement>) => setWork(e.target.value)} placeholder='Фокус' />
                <h2>Перерыв</h2>
                <Input value={shortBreak} onChange={(e: ChangeEvent<HTMLInputElement>) => setShortBreak(e.target.value)} placeholder='Перерыв' />
                <h2>Длинный перерыв</h2>
                <Input value={longBreak} onChange={(e: ChangeEvent<HTMLInputElement>) => setLongBreak(e.target.value)} placeholder='Длинный перерыв' />
                <button onClick={(e) => acceptChange(e)} className='border-[black] border-[2px] mt-3 mb-3 p-2 outline-none'>Подтвердить</button>
            </form>
        </div>
    )
}

export default Form