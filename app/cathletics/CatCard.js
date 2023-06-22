import React from 'react'

const CatCard = ({ cat }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl border-2 border-primary hover:border-primary-focus mt-5 ml-5 text-center">
            <div className="card-body">
                <div className='flex items-center justify-center mb-2'>
                    <h2 className="card-title text-right">{cat.name}</h2>
                </div>
                <div className='flex'>
                    <div className='w-1/2'>
                        <p>Strength: {cat.strength}</p>
                        <p>Stamina: {cat.stamina}</p>
                        <p>Speed: {cat.speed}</p>
                    </div>
                    <div className='w-1/2'>
                        <p>Level: {cat.level}</p>
                        <p>Wins: {cat.wins}</p>
                        <p>Losses: {cat.losses}</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className="card-actions">
                        <button className="btn btn-primary w-full">Add win</button>
                        <button className="btn btn-primary w-full">Remove win</button>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card-actions">
                        <button className="btn btn-primary w-full">add loss</button>
                        <button className="btn btn-primary w-full">Remove loss</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatCard