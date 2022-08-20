import React, { useState } from 'react'
import Form from './Form'

const Header = () => {
    const [showForm, setShowForm] = useState(false)
    const showModal = () => {
        setShowForm(!showForm)
    }

    return (
        <ul className='flex justify-between w-[125px] border-[white] border-b-2 pb-4'>
            <li onClick={showModal} className='cursor-pointer'>Изменить время</li>
            {/* <li>Авторизация</li> */}
            <Form setShowForm={setShowForm} show={showForm} />
        </ul>

    )
}

export default Header