'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import fetchCats from '@/components/FetchCats'
import CatTable from './CatTable'
import BarChartRepresentation from './BarChartRepresentation'
import fetchMatches from '@/components/FetchMatches'

const page = () => {
  const [cats, setCats] = useState(null)
  const [matches, setMatches] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

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
    <div className=''>
      {/* grafer i toppen */}
      <div>
        <BarChartRepresentation matches={matches} />
      </div>
      <div className=' h-96'>
      </div>
      {/* tabell i bunden, met katte og deres winrate */}
      <div className='flex justify-center'>
        <CatTable cats={cats} />
      </div>
    </div>
  )
}

export default page