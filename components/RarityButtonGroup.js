import React from 'react'
import { rarities } from './Constants'

const RarityButtonGroup = ({ setRarity, rarity, description }) => {

    return (
        <div className="form-control ml-2">
            <label className="label">
                <span className="label-text">{description}</span>
            </label>
            <label className="input-group shadow-md">
                <span>Rarity</span>
                <select
                    className="select select-bordered w-full max-w-xs bg-base-200"
                    value={rarity}
                    onChange={(e) => setRarity(e.target.value)}
                >
                    {rarities.map((rarity) => (
                        <option key={rarity} value={rarity}>{rarity}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default RarityButtonGroup