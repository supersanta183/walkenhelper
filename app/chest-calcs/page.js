"use client"
import React, { useState } from 'react'

import RarityButtonGroup from '@/components/RarityButtonGroup'
import { TeamLeaderRarityRate, TeamMemberRarityRate, TeamLeaderClothesRarityRate } from '@/components/Constants'

const page = () => {
    const [teamLeaderRarity, setTeamLeaderRarity] = useState("NONE")
    const [memberOneRarity, setMemberOneRarity] = useState("NONE")
    const [memberTwoRarity, setMemberTwoRarity] = useState("NONE")
    const [memberThreeRarity, setMemberThreeRarity] = useState("NONE")
    const [memberFourRarity, setMemberFourRarity] = useState("NONE")
    const [hatRarity, setHatRarity] = useState("NONE")
    const [shirtRarity, setShirtRarity] = useState("NONE")
    const [shortsRarity, setShortsRarity] = useState("NONE")
    const [accesoryRarity, setAccesoryRarity] = useState("NONE")
    const [sneakersRarity, setSneakersRarity] = useState("NONE")
    const [artefactsRarity, setArtefactsRarity] = useState("NONE")
    const [droprate, setDroprate] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    const calculateDroprate = () => {
        if(teamLeaderRarity === "NONE"){
            setDroprate([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            return
        }
        let tempDroprate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tempDroprate = recalculate(tempDroprate, TeamLeaderRarityRate[teamLeaderRarity])
        tempDroprate = recalculate(tempDroprate, TeamMemberRarityRate[memberOneRarity])
        tempDroprate = recalculate(tempDroprate, TeamMemberRarityRate[memberTwoRarity])
        tempDroprate = recalculate(tempDroprate, TeamMemberRarityRate[memberThreeRarity])
        tempDroprate = recalculate(tempDroprate, TeamMemberRarityRate[memberFourRarity])
        tempDroprate = recalculate(tempDroprate, TeamLeaderClothesRarityRate[hatRarity])
        tempDroprate = recalculate(tempDroprate, TeamLeaderClothesRarityRate[shirtRarity])
        tempDroprate = recalculate(tempDroprate, TeamLeaderClothesRarityRate[shortsRarity])
        tempDroprate = recalculate(tempDroprate, TeamLeaderClothesRarityRate[accesoryRarity])
        tempDroprate = recalculate(tempDroprate, TeamLeaderClothesRarityRate[sneakersRarity])
        tempDroprate = recalculate(tempDroprate, TeamLeaderClothesRarityRate[artefactsRarity])
        setDroprate(tempDroprate)
    }

    const recalculate = (tempDroprate, nextDroprate) => {
        tempDroprate.forEach((item, index) => {
            item += nextDroprate[index]
            tempDroprate[index] = Number(item.toFixed(2))
        })
        return tempDroprate
    }

    return (
        <div className='h-full max-w-screen'>
            <div className='card flex items-center justify-center flex-grow px-2'>
                <div className='card-actions mt-5 bg-base-200 bg-opacity-80 rounded-2xl flex flex-col justify-center card-bordered shadow-xl'>
                    <div className='flex'>
                        <div>
                            <h2 className='text-center font-semibold'>Team members</h2>
                            <RarityButtonGroup
                                setRarity={setTeamLeaderRarity}
                                rarity={teamLeaderRarity}
                                description={"Team leader rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setMemberOneRarity}
                                rarity={memberOneRarity}
                                description={"Member 1 rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setMemberTwoRarity}
                                rarity={memberTwoRarity}
                                description={"Member 2 rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setMemberThreeRarity}
                                rarity={memberThreeRarity}
                                description={"Member 3 rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setMemberFourRarity}
                                rarity={memberFourRarity}
                                description={"Member 4 rarity"}
                            />
                        </div>
                        <div>
                            <h2 className='text-center font-semibold'>Team leaders items</h2>
                            <RarityButtonGroup
                                setRarity={setHatRarity}
                                rarity={hatRarity}
                                description={"Hat rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setShirtRarity}
                                rarity={shirtRarity}
                                description={"Tshirt rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setShortsRarity}
                                rarity={shortsRarity}
                                description={"Shorts rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setSneakersRarity}
                                rarity={sneakersRarity}
                                description={"Sneakers rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setAccesoryRarity}
                                rarity={accesoryRarity}
                                description={"Accesory rarity"}
                            />
                            <RarityButtonGroup
                                setRarity={setArtefactsRarity}
                                rarity={artefactsRarity}
                                description={"Artefacts rarity"}
                            />
                        </div>
                    </div>
                    <button className='btn btn-primary w-3/4 self-center' onClick={calculateDroprate}>Calculate droprate</button>
                </div>
                <div className='flex items-end justify-center mt-2 w-full'>
                    <div className='flex stats justify-start bg-base-200 bg-opacity-80 stats-vertical lg:h-24 px-2  overflow-x-auto'>
                        {droprate.map((item, index) => {
                            return (
                                <div className='px-2 stat' key={index}>
                                    <div className='stat-title'>Chest lvl {index + 1}</div>
                                    <div className='stat-value text-center'>{item}%</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page