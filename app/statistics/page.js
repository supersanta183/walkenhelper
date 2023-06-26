'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import fetchCats from '@/components/FetchCats'
import CatTable from './CatTable'
import ProfitChart from './ProfitChart'
import BarChartRepresentation from './BarChartRepresentation'
import fetchMatches from '@/components/FetchMatches'

const page = () => {
  const [cats, setCats] = useState(null)
  const [matches, setMatches] = useState(null)
  const [dates, setDates] = useState([])
  const [barchartData, setBarchartData] = useState([])
  const [profitData, setProfitData] = useState([])
  const [totalProfit, setTotalProfit] = useState(0)
  const battlePrice = 17

  useEffect(() => {
    if (!matches) return
    const uniqueDates = [...new Set(matches.map(match => match.time))];
    setDates(uniqueDates);
  }, [matches])

  useEffect(() => {
    createData()
  }, [dates, matches])

  useEffect(() => {
    fetchItems()
  }, [])

  const createData = () => {
    const tempData = []
    const tempProfitData = []
    let totalProfit = 0
    let profit = 0
    let wins = 0
    let losses = 0
    dates.forEach(date => {
      matches.forEach(match => {
        if (match.time === date) {
          if (match.result === 'win') {
            totalProfit += 25
            profit += 25
            wins += 1
          } else if (match.result === 'loss') {
            totalProfit -= battlePrice
            profit -= battlePrice
            losses += 1
          }
        }
      })
      tempData.push({ date: date, win: wins, loss: losses })
      tempProfitData.push({ date: date, profit: profit })
      profit = 0
      wins = 0
      losses = 0
    })
    setTotalProfit(totalProfit)
    setProfitData(tempProfitData)
    setBarchartData(tempData)
  }

  const fetchItems = async () => {
    const fetchedCats = await fetchCats().then((data) => {
      setCats(data)
    })
    const fetchedMatches = await fetchMatches().then((data) => {
      setMatches(data)
    })
  }

  if (!cats || !matches) return <div>loading...</div>

  return (
    <div className='min-h-full bg-base-100 bg-opacity-80 bg-fixed bg-cover'>
      {/* grafer i toppen */}
      <div className='w-full flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 w-full'>
          <ProfitChart data={profitData} />
        </div>
        <div className='lg:w-1/2 w-full'>
          <BarChartRepresentation matches={matches} data={barchartData} />
        </div>
      </div>
      {/* tabell i bunden, met katte og deres winrate */}
      <div className='flex justify-center'>
        <CatTable cats={cats} />
      </div>
    </div>
  )
}

export default page