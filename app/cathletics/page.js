"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/firebase/firebaseApp'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { updateUser } from '@/components/FetchUser';
import UserDropdown from '@/components/UserDropdown';
import CatCard from './CatCard'
import AddCat from './AddCat';


const CathleticsPage = () => {
    const [newCatName, setNewCatName] = useState(null)
    const [newCatLevel, setNewCatLevel] = useState(null)
    const [newCatRarity, setNewCatRarity] = useState(null)
    const [user, setUser] = useState('Emil')
    const [fetchedUser, setFetchedUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        let user = localStorage.getItem('user')
        if (user) {
            setUser(user)
        }
        getUser()
    }, [])

    useEffect(() => {
        getUser()
        setIsOpen(false)
    }, [user])

    const getUser = async () => {
        if (!user) return
        const userRef = query(collection(db, "users"), where("name", "==", user))
        await getDocs(userRef).then((result) => {
            setFetchedUser(result.docs[0].data())
        })
    }

    const handleUserSelection = (value) => {
        localStorage.setItem('user', value)
        setUser(value)
    }

    if (!fetchedUser) return <div>Loading...</div>
    return (

        <div className='pl-0 flex flex-col pb-5 max-w-screen'>

            <AddCat 
                setNewCatName={setNewCatName}
                newCatName={newCatName}
                setNewCatLevel={setNewCatLevel}
                newCatLevel={newCatLevel}
                setNewCatRarity={setNewCatRarity}
                newCatRarity={newCatRarity}
                updateUser={updateUser}
                fetchedUser={fetchedUser}
            />


            <div className='navbar'>
                <div className='navbar-start'>
                    <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4 bg-opacity-80" onClick={() => window.my_modal_5.showModal()}>Add cathletic
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
                <div className='navbar-end'>
                    <UserDropdown
                        handleUserSelection={handleUserSelection}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        user={user}
                    />
                </div>
            </div>
            <div className='flex flex-col lg:flex-row h-full'>
                {fetchedUser.cats.map((cat) => (
                    <CatCard key={cat.id} cat={cat} updateUser={updateUser} user={fetchedUser} fetchUser={getUser} />
                ))}
            </div>

        </div>
    )
}

export default CathleticsPage