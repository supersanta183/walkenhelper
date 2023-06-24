"use client"
import React, { use, useEffect } from 'react'
import CatCard from './CatCard'
import { useState } from 'react'
import { db } from '@/firebase/firebaseApp'
import { setDoc, doc, collection } from 'firebase/firestore'
import fetchCats from '@/components/FetchCats'
import CatStatButtonGroup from './CatStatButtonGroup'
import { v4 as uuidv4 } from 'uuid';

const page = () => {
    const [cats, setCats] = useState([])
    const [newCatName, setNewCatName] = useState(null)
    const [newCatLevel, setNewCatLevel] = useState(null)
    const [newCatRarity, setNewCatRarity] = useState(null)

    const getCats = async () => {
        const fetchedCats = await fetchCats().then((data) => {
            setCats(data)
        })
    }

    const resetCat = () => {
        setNewCatName(null)
        setNewCatLevel(null)
        setNewCatRarity(null)
    }

    useEffect(() => {
        getCats()
    }, [])

    const addCat = async () => {
        if(!newCatName || !newCatLevel || !newCatRarity) {
            alert('Please fill out all fields')
            resetCat()
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
        updateCat(newCat)
        getCats()
        resetCat()
    }

    const updateCat = async (cat) => {
        const catRef = collection(db, "cats")
        await setDoc(doc(catRef, cat.id.toString()), cat)
    }

    if (!cats) return <div>Loading...</div>
    return (

        <div className='flex flex-col pb-5'>

            {/* Modal 5 */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h2 className="font-bold text-lg text-center mb-2">Add a new cathletic:</h2>
                    <CatStatButtonGroup description="Name" setField={setNewCatName} value={newCatName}/>
                    <CatStatButtonGroup description="Level" setField={setNewCatLevel} value={newCatLevel}/>
                    <CatStatButtonGroup description="Rarity" setField={setNewCatRarity} value={newCatRarity}/>
                    
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={addCat}>Close</button>
                    </div>
                </form>
            </dialog>


            <div className=' mr-2 lg:ml-5 flex justify-end lg:justify-start'>
                <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4" onClick={() => window.my_modal_5.showModal()}>Add cathletic
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div className='flex flex-col lg:flex-row h-full'>
                {cats.map((cat) => (
                    <CatCard key={cat.id} cat={cat} updateCat={updateCat} fetchCats={getCats}/>
                ))}
            </div>

        </div>
    )
}

export default page