import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase/firebaseApp'
import { setDoc, doc, collection } from 'firebase/firestore'

const CatCard = ({ cat, updateCat, fetchCats }) => {

    const calculateWinrate = async () => {
        if(cat.PVPwins > 0 || cat.PVPlosses > 0) {
            cat.winrate = Math.round((cat.PVPwins / (cat.PVPwins + cat.PVPlosses)) * 100)
        } else {
            cat.winrate = 0
        }
        await updateCat(cat)
        fetchCats()
    }

    const addWonMatch = async (cat) => {
        
        const newMatch = {
            id: uuidv4(),
            result: "win",
            time: new Date().toLocaleString().slice(0, 10)
        }
        cat["matches"].push(newMatch)
        const catRef = collection(db, "cats")
        await setDoc(doc(catRef, cat.id.toString()), cat)
    }

    const addLostMatch = async (cat) => {
        if(!cat.matches) {
            return
        }
        const newMatch = {
            id: uuidv4(),
            result: "loss",
            time: new Date().toLocaleString().slice(0, 10)
        }
        cat.matches.push(newMatch)
        const catRef = collection(db, "cats")
        await setDoc(doc(catRef, cat.id.toString()), cat)
    }

    const handleAddWin = async () => {
        cat.PVPwins += 1
        await addWonMatch(cat)
        await calculateWinrate()
    }

    const handleRemoveWin = async () => {
        cat.PVPwins -= 1
        await calculateWinrate()
    }

    const handleAddLoss = async () => {
        cat.PVPlosses += 1
        await addLostMatch(cat)
        await calculateWinrate()
    }

    const handleRemoveLoss = async () => {
        cat.PVPlosses -= 1
        await calculateWinrate()
    }


    return (
        <div className="card flex justify-center items-center lg:w-96 bg-base-100 bg-opacity-80 shadow-xl border-2 border-primary hover:border-primary-focus mt-5 lg:ml-5 ml-2 mr-2 text-center">
            <div className="card-body w-full">
                <div className='flex items-center justify-center'>
                    <h2 className="card-title text-right">{cat.name} <div className="badge badge-accent">Level: {cat.level}</div></h2>
                </div>
                <div className='flex justify-center max-w-fit'>
                    <div className=''>
                        <div className="stats stats-horizontal bg-transparent">

                            <div className="stat">
                                <div className="stat-title">PVP wins</div>
                                <div className="stat-value">{cat.PVPwins}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">PVP losses</div>
                                <div className="stat-value">{cat.PVPlosses}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Winrate</div>
                                <div className="stat-value">{cat.winrate}%</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className="card-actions">
                        <button className="btn btn-primary w-full" onClick={handleAddWin}>Add win</button>
                        <button className="btn btn-primary w-full" onClick={handleRemoveWin}>Remove win</button>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card-actions">
                        <button className="btn btn-primary w-full" onClick={handleAddLoss}>add loss</button>
                        <button className="btn btn-primary w-full" onClick={handleRemoveLoss}>Remove loss</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatCard