'use client'
import React from 'react'
import { useState, useEffect } from 'react'

import CatTable from './CatTable'
import ProfitChart from './ProfitChart'
import BarChartRepresentation from './BarChartRepresentation'
import fetchUser from '@/components/FetchUser'
import TotalProfitBar from './TotalProfitBar'
import { useGlobalContext } from '../Context/store'

const page = () => {
  const [cats, setCats] = useState(null)
  const [matches, setMatches] = useState(null)
  const [dates, setDates] = useState([])
  const [barchartData, setBarchartData] = useState([])
  const [profitData, setProfitData] = useState([])
  const [totalProfit, setTotalProfit] = useState(0)
  const [berryPack, setBerryPack] = useState(5000)
  const [berryPrice, setBerryPrice] = useState(0.084998)
  const { userId, setUserId, user, setUser } = useGlobalContext()

  useEffect(() => {
    if (!matches) return
    const uniqueDates = [...new Set(matches.map(match => match.time))];
    setDates(uniqueDates);
  }, [matches])

  useEffect(() => {
    createData()
  }, [dates, matches, berryPrice])

  useEffect(() => {
    setPrices()
  }, [berryPack])


  useEffect(() => {
    if (!user) return
    setCats(user.cats)
    setMatches(user.matches)
  }, [user])

  useEffect(() => {
    const tempBerryPack = localStorage.getItem("berrypack")
    if (tempBerryPack) {
      setBerryPack(tempBerryPack)
    }
  }, [])

  const setPrices = () => {
    switch (berryPack) {
      case '10':
        setBerryPrice(0.1)
        break;
      case '50':
        setBerryPrice(0.0998)
        break;
      case '250':
        setBerryPrice(0.09196)
        break;
      case '750':
        setBerryPrice(0.0919866666666667)
        break;
      case '1500':
        setBerryPrice(0.0899933333333333)
        break;
      case '5000':
        setBerryPrice(0.084998)
        break;
      case '25000':
        setBerryPrice(0.0799996)
        break;
      case '50000':
        setBerryPrice(0.0749998)
        break;
      case '100000':
        setBerryPrice(0.0699999)
        break;
    }
  }

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
          let matchcost = parseInt(match.league.entranceFee)
          let boostcost = parseInt(match.league.boostFee)
          let reward = parseInt(match.league.reward)
          if (match.result === 'win') {
            totalProfit += reward - (matchcost + boostcost) * berryPrice
            profit += reward - (matchcost + boostcost) * berryPrice
            wins += 1
          } else if (match.result === 'loss') {
            totalProfit -= (matchcost + boostcost) * berryPrice
            profit -= (matchcost + boostcost) * berryPrice
            losses += 1
          }
        }
      })
      tempData.push({ date: date, win: wins, loss: losses })
      tempProfitData.push({ date: date, profit: profit.toFixed(0) })
      profit = 0
      wins = 0
      losses = 0
    })
    setTotalProfit(totalProfit.toFixed(0))
    setProfitData(tempProfitData)
    setBarchartData(tempData)
  }

  if (!cats || !matches) return (
    <div className='flex items-center justify-center h-full'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )

  return (
    <div className='min-h-full h-auto bg-base-100 bg-opacity-80'>
      <div className='h-full'>
        {/* grafer i toppen */}
        <div className='w-full flex flex-col lg:flex-row'>
          <div className='lg:w-1/2 w-full'>
            <ProfitChart data={profitData} />
          </div>
          <div className='lg:w-1/2 w-full'>
            <BarChartRepresentation matches={matches} data={barchartData} />
          </div>
        </div>
        <div className=''>
          <TotalProfitBar totalProfit={totalProfit} berryPack={berryPack} setBerryPack={setBerryPack} />
        </div>
        {/* tabell i bunden, met katte og deres winrate */}
        <div className='flex justify-center'>
          <CatTable cats={cats} />
        </div>
      </div>
    </div>
  )
}

export default page