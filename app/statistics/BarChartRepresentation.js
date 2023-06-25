'use client'
import React, { useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const BarChartRepresentation = ({ matches }) => {
    const [dates, setDates] = useState([])
    const [data, setdata] = useState([])

    const createData = () => {
        const tempData = []
        let wins = 0
        let losses = 0
        dates.forEach(date => {
            matches.forEach(match => {
                if (match.time === date) {
                    if(match.result === 'win'){
                        wins += 1
                    } else if (match.result === 'loss') {
                        losses += 1
                    }
                }
            })
            tempData.push({ date: date, win: wins, loss: losses })
            wins = 0
            losses = 0
        })
        setdata(tempData)
    }

    useEffect(() => {
        const uniqueDates = [...new Set(matches.map(match => match.time))];
        setDates(uniqueDates);
    }, [])

    useEffect(() => {
        createData()
    }, [dates])

    useEffect(() => {
        console.log(data)
    }, [data])

    const data2 = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <div className='flex'>
            <div className='w-1/2'>

            </div>
            <div className=' mt-5 card bg-base-100 bg-opacity-80'>
                <div className='card-body'>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
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
                </div>
            </div>
        </div>
    )
}

export default BarChartRepresentation