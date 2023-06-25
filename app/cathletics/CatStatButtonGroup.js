import React from 'react'

// input-group used for adding a new cat to the database
const CatStatButtonGroup = ({description, setField, value}) => {
    return (
        <div className="pb-1">
            <label className="input-group">
                <span className='w-24'>{description}</span>
                <input type="text" placeholder="Type here" value={value ? value : ''} onChange={(e) => setField(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
        </div>
    )
}

export default CatStatButtonGroup