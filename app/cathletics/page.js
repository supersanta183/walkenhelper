"use client"
import React, { useEffect, useState } from 'react'

import { updateUser } from '@/components/FetchUser';
import CatCard from './CatCard'
import AddCat from './AddCat';
import fetchUser from '@/components/FetchUser';
import { useGlobalContext } from '../Context/store';


const CathleticsPage = () => {
    const [newCatName, setNewCatName] = useState(null)
    const [newCatLevel, setNewCatLevel] = useState(null)
    const [newCatRarity, setNewCatRarity] = useState(null)
    const { userId, setUserId, user, setUser } = useGlobalContext()

    const fetchAndSetUser = async () => {
        if (!userId) return
        setUser(await fetchUser(userId))
    }

    if (!user) return (
        <div className='flex items-center justify-center h-full'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    )

    return (

        <div className='pl-0 pb-5 max-w-screen flex flex-col h-full'>

                <AddCat
                    setNewCatName={setNewCatName}
                    newCatName={newCatName}
                    setNewCatLevel={setNewCatLevel}
                    newCatLevel={newCatLevel}
                    setNewCatRarity={setNewCatRarity}
                    newCatRarity={newCatRarity}
                    updateUser={updateUser}
                    fetchedUser={user}
                />

            <div className='navbar p-0'>
                <div className='navbar-start'>
                    <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4 ml-5 bg-opacity-80" onClick={() => window.my_modal_5.showModal()}>Add cathlete
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='flex w-screen px-2 flex-col h-full lg:flex-wrap'>
                {user.cats.map((cat) => (
                    <CatCard
                        key={cat.id}
                        cat={cat}
                        updateUser={updateUser}
                        user={user}
                        fetchUser={fetchAndSetUser}
                    />
                ))}
            </div>

        </div>
    )
}

export default CathleticsPage