"use client"
import React, { useEffect, useState } from 'react'
import CatCard from './CatCard'
import { db } from '@/firebase/firebaseApp'
import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'
import CatStatButtonGroup from './CatStatButtonGroup'
import { v4 as uuidv4 } from 'uuid';

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

    const updateUser = async (user) => {
        const userRef = collection(db, "users")
        await setDoc(doc(userRef, user.id.toString()), user)
      }

    const getUser = async () => {
        if(!user) return
        const userRef = query(collection(db, "users"), where("name", "==", user))
        await getDocs(userRef).then((result) => {
            setFetchedUser(result.docs[0].data())
        })
    }

    //resets the new cat fields
    const resetNewCat = () => {
        setNewCatName(null)
        setNewCatLevel(null)
        setNewCatRarity(null)
    }

    //creates a new cat object and adds it to the database
    const addCat = async () => {
        if (!newCatName || !newCatLevel || !newCatRarity) {
            alert('Please fill out all fields')
            resetNewCat()
            return
        }
        const newCat = {
            id: uuidv4(),
            name: newCatName,
            level: newCatLevel,
            rarity: newCatRarity,
            PVPwins: 0,
            PVPlosses: 0,
            winrate: 0,
        }

        const newUser = fetchedUser
        newUser.cats.push(newCat)
        updateUser(newUser)
        resetNewCat()
    }

    const handleUserSelection = (value) => {
        localStorage.setItem('user', value)
        setUser(value)
    }

    if (!fetchedUser) return <div>Loading...</div>
    return (

        <div className='pl-0 flex flex-col pb-5 max-w-screen'>

            {/* Modal that pops up when "add cathletic" is clicked */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h2 className="font-bold text-lg text-center mb-2">Add a new cathletic:</h2>
                    <CatStatButtonGroup description="Name" setField={setNewCatName} value={newCatName} />
                    <CatStatButtonGroup description="Level" setField={setNewCatLevel} value={newCatLevel} />
                    <CatStatButtonGroup description="Rarity" setField={setNewCatRarity} value={newCatRarity} />

                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={addCat}>Close</button>
                    </div>
                </form>
            </dialog>


            <div className='navbar'>
                <div className='navbar-start'>
                    <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4 bg-opacity-80" onClick={() => window.my_modal_5.showModal()}>Add cathletic
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
                <div className='navbar-end'>
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