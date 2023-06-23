import React from 'react'

const CatCard = ({ cat, updateCat, fetchCats }) => {

    const handleAddWin = async () => {
        cat.PVPwins += 1
        if(cat.PVPwins > 0 || cat.PVPlosses > 0) {
            cat.winrate = Math.round((cat.PVPwins / (cat.PVPwins + cat.PVPlosses)) * 100)
        } else {
            cat.winrate = 0
        }
        await updateCat(cat)
        fetchCats()
    }

    const handleRemoveWin = async () => {
        cat.PVPwins -= 1
        if(cat.PVPwins > 0 || cat.PVPlosses > 0) {
            cat.winrate = Math.round((cat.PVPwins / (cat.PVPwins + cat.PVPlosses)) * 100)
        } else {
            cat.winrate = 0
        }
        await updateCat(cat)
        fetchCats()
    }

    const handleAddLoss = async () => {
        cat.PVPlosses += 1
        if(cat.PVPwins > 0 || cat.PVPlosses > 0) {
            cat.winrate = Math.round((cat.PVPwins / (cat.PVPwins + cat.PVPlosses)) * 100)
        } else {
            cat.winrate = 0
        }
        await updateCat(cat)
        fetchCats()
    }

    const handleRemoveLoss = async () => {
        cat.PVPlosses -= 1
        if(cat.PVPwins > 0 || cat.PVPlosses > 0) {
            cat.winrate = Math.round((cat.PVPwins / (cat.PVPwins + cat.PVPlosses)) * 100)
        } else {
            cat.winrate = 0
        }
        await updateCat(cat)
        fetchCats()
    }


    return (
        <div className="card w-96 bg-base-100 shadow-xl border-2 border-primary hover:border-primary-focus mt-5 lg:ml-5 ml-2 mr-2 text-center">
            <div className="card-body">
                <div className='flex items-center justify-center'>
                    <h2 className="card-title text-right">{cat.name} <div className="badge badge-accent">Level: {cat.level}</div></h2>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <div className="stats stats-vertical lg:stats-horizontal shadow">

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