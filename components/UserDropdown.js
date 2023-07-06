import React from 'react'
import { useState, useEffect } from 'react'

const UserDropdown = ({ user, setUser }) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [user])

    const handleUserSelection = (value) => {
        localStorage.setItem('userid', value)
        setUser(value)
    }

    return (
        <div className='dropdown dropdown-end mr-5' onClick={() => setIsOpen(true)}>
            <label tabIndex={0} className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4 bg-opacity-80">
                {user}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </label>
            {
                isOpen &&
                <ul tabIndex={0} className="p-2 z-10 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                    <li onClick={() => handleUserSelection('dc544abe-8559-43b2-8294-4f1182b44ad1')}><a>Emil </a></li>
                    <li onClick={() => handleUserSelection('d89cf4e3-eaa5-406b-97e6-9252d8c6daf0')}><a>Bjarke</a></li>
                </ul>
            }
        </div>
    )
}

export default UserDropdown