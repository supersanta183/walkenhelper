import React from 'react'

const CatTable = ({ cats }) => {
    return (
        <div className="overflow-auto w-full h-full rounded-xl mb-0">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Winrate</th>
                    </tr>
                </thead>
                <tbody>
                    {cats.map((cat, index) => (
                        <tr className=' hover:bg-base-100' key={cat.id}>
                            <th>{index+1}</th>
                            <td>{cat.name}</td>
                            <td>{cat.PVPwins}</td>
                            <td>{cat.PVPlosses}</td>
                            <td>{cat.winrate}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CatTable