'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import fetchCats from '@/components/FetchCats'
import CatTable from './CatTable'

const page = () => {
  const [cats, setCats] = useState(null)

  useEffect(() => {
    getCats()
  }, [])

  const getCats = async () => {
    const fetchedCats = await fetchCats().then((data) => {
      setCats(data)
    })
  }

  if (!cats) return <div>loading...</div>

  return (
    <div className=''>
      {/* grafer i toppen */}
      <div>
        {cats[0].matches[1].time ? cats[0].matches[1].time : 'no time'}
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