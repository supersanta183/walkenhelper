'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartRepresentation = ({ matches, data }) => {
    return (
        <div className='flex'>
            <div className=' mt-5 card w-full'>
                <div className='card-body flex lg:flex-col justify-center items-center'>
                    <h2 className="card-title text-center">Matches</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="win" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="loss" stackId="a" fill="#F47174" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default BarChartRepresentation