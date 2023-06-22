import React from 'react'
import CatCard from './CatCard'

const testCat = {
    id:1,
    name: 'Oluf',
    wins: 0,
    losses: 0,
    level: 6,
    strength: 1,
    stamina: 2,
    speed: 3,
}

const testCat2 = {
    id:2,
    name: 'Peter',
    wins: 0,
    losses: 0,
    level: 6,
    strength: 1,
    stamina: 2,
    speed: 3,
}

const testcats = [testCat, testCat2]

const page = () => {
    return (
        <div className='flex flex-col'>
            <div className='ml-5'>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg flex text-center">Add cathletic
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div className='flex'>
                {testcats.map((cat) => (
                    <CatCard key={cat.id} cat={cat} />
                ))}
            </div>

        </div>
    )
}

export default page