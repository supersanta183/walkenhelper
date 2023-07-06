'use client'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import { deleteCat } from '@/components/FetchUser';

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
            league: cat.PVPLeague
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
        fetchUser()
    }

    const handleRemoveMatch = async (result) => {
        if (result === 'win' && cat.PVPwins === 0) {
            return
        }
        if (result === 'loss' && cat.PVPlosses === 0) {
            return
        }

        let matches = user.matches
        if (matches.length === 1 && matches[0].result === result) {
            user.matches = []
            decrementWinLoss(result)
            await updateUser(user)
            await calculateWinrate()
            fetchUser()
            return
        } else if (matches.length === 1 && matches[0].result !== result) {
            return
        }
        for (let i = matches.length - 1; i >= 0; i--) {
            if (matches[i].result === result) {
                if (i === 0) {
                    matches.shift()
                } else {
                    matches.splice(i, i)
                }
                user.matches = matches
                decrementWinLoss(result)
                await updateUser(user)
                await calculateWinrate()
                fetchUser()
                return
            }
        }
    }

    const decrementWinLoss = (result) => {
        switch (result) {
            case 'win':
                cat.PVPwins -= 1
                break;
            case 'loss':
                cat.PVPlosses -= 1
                break;
        }
    }

    const removeCat = async () => {
        await deleteCat(user, cat)
        fetchUser()
    }

    return (
        <div className="card flex justify-center items-center lg:w-96 bg-base-100 bg-opacity-80 shadow-xl border-2 border-primary hover:border-primary-focus mt-5 lg:ml-5 ml-2 mr-2 text-center h-72">
            <div className="card-body w-full">
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-center w-full'>
                        <h2 className="card-title text-right pr-2">{cat.name}</h2>
                        <div className="badge badge-accent">Level: {cat.level}</div>
                    </div>
                    <div className='flex items-center'>
                        <button className='btn bg-transparent border-0' onClick={removeCat}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
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
                            onClick={() => handleRemoveMatch('win')}>
                            Remove win
                        </button>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card-actions">
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => handleAddMatch('loss')}>
                            add loss
                        </button>

                        <button
                            className="btn btn-primary w-full"
                            onClick={() => handleRemoveMatch('loss')}>
                            Remove loss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatCard