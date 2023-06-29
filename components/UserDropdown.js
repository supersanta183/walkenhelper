import React from 'react'

const UserDropdown = ({ handleUserSelection, isOpen, setIsOpen, user }) => {
    return (
        <div className='dropdown dropdown-end' onClick={() => setIsOpen(true)}>
            <label tabIndex={0} className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4 bg-opacity-80">
                {user || 'select User'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </label>
            {
                isOpen &&
                <ul tabIndex={0} className="p-2 z-10 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                    <li onClick={() => handleUserSelection('Emil')}><a>Emil </a></li>
                    <li onClick={() => handleUserSelection('Bjarke')}><a>Bjarke</a></li>
                </ul>
            }
        </div>
    )
}

export default UserDropdown