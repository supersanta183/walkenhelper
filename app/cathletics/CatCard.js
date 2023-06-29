'use client'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const CatCard = ({ cat, updateUser, fetchUser, user }) => {

    const calculateWinrate = async () => {
        if (!user || !cat) return
        if (cat.PVPwins > 0 || cat.PVPlosses > 0) {
            cat.winrate = Math.round((cat.PVPwins / (cat.PVPwins + cat.PVPlosses)) * 100)
        } else {
            cat.winrate = 0
        }
        let newUser = user
        newUser.cats.map((c) => {
            if (c.id === cat.id) {
                c.winrate = cat.winrate
            }
        })

        await updateUser(newUser)
        fetchUser()
    }

    const handleAddMatch = async (result) => {
        if (!user) return

        //create a new match
        let newUser = user
        let dateobj = new Date()
        let month = dateobj.getMonth() + 1
        let day = dateobj.getDate()
        let year = dateobj.getFullYear()
        const newdate = day + "/" + month + "/" + year
        const newMatch = {
            id: uuidv4(),
            result: "",
            time: newdate,
        }

        switch (result) {
            case 'win':
                cat.PVPwins += 1
                newMatch.result = 'win'
                break;

            case 'loss':
                cat.PVPlosses += 1
                newMatch.result = 'loss'
                break;
        }

        //update users matches and update user in database
        newUser.matches.push(newMatch)
        await updateUser(newUser)
        calculateWinrate()
    }

    const handleRemoveWin = async () => {
        user.matches.pop()
        cat.PVPwins -= 1
        await updateUser(user)
        await calculateWinrate()
    }

    const handleRemoveLoss = async () => {
        user.matches.pop()
        cat.PVPlosses -= 1
        await updateUser(user)
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
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => handleAddMatch('win')}>
                            Add win
                        </button>
                        <button
                            className="btn btn-primary w-full"
                            onClick={handleRemoveWin}>
                            Remove win
                        </button>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card-actions">
                        <button className="btn btn-primary w-full" onClick={() => handleAddMatch('loss')}>add loss</button>
                        <button className="btn btn-primary w-full" onClick={handleRemoveLoss}>Remove loss</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatCard