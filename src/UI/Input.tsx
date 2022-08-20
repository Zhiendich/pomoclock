import React, { ChangeEvent, MutableRefObject } from 'react'

interface InputProps {
    placeholder?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    ref?: MutableRefObject<string>

}
const Input = ({ placeholder, value, onChange, ref }: InputProps) => {
    return (
        <input ref={ref as unknown as string} className='border-[black] border-[2px] mt-3 mb-3 p-2 outline-none' value={value} onChange={onChange} type="number" placeholder={placeholder} />
    )
}

export default Input