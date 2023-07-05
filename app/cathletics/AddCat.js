import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import RarityButtonGroup from '@/components/RarityButtonGroup'
import { rarities } from '@/components/Constants'
import { assignLeague } from '@/constants/AssignLeague';

const AddCat = ({ setNewCatName, newCatName, setNewCatLevel, newCatLevel, setNewCatRarity, newCatRarity, updateUser, fetchedUser }) => {

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
            PVPLeague: assignLeague(newCatLevel, newCatRarity)
        }

        const newUser = fetchedUser
        newUser.cats.push(newCat)
        updateUser(newUser)
        resetNewCat()
    }

    const handleLevelChange = (e) => {
        setNewCatLevel(e.target.value)
    }

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <form method="dialog" className="modal-box">
                <h2 className="font-bold text-lg text-center mb-2">Add a new cathletic:</h2>

                <label className="input-group">
                    <span className='w-24'>Name</span>
                    <input type="text" placeholder="Type here" value={newCatName ? newCatName : ''} onChange={(e) => setNewCatName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className='input-group w-full py-2'>
                    <span className='w-24'>Level</span>
                    <input type="range" min={0} max={13} value={newCatLevel ? newCatLevel : 0} onChange={(e) => handleLevelChange(e)} className="range" step={1} />
                    <span>{newCatLevel ? newCatLevel : 0}</span>
                </label>

                <label className="input-group shadow-md">
                    <span>Rarity</span>
                    <select
                        className="select select-bordered w-full max-w-xs bg-base-200"
                        value={newCatRarity ? newCatRarity : ""}
                        onChange={(e) => setNewCatRarity(e.target.value)}
                    >
                        {rarities.map((rarity) => (
                            <option key={rarity} value={rarity}>{rarity}</option>
                        ))}
                    </select>
                </label>


                <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn" onClick={addCat}>Add cathletic</button>
                </div>
            </form>
        </dialog>
    )
}

export default AddCat