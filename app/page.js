"use client"
import React, { useEffect } from 'react';
import { useGlobalContext } from './Context/store';


import { NOLEAGUE } from '@/constants/PVPLeagues';
import { v4 as uuidv4 } from 'uuid';
import { updateUser } from '@/components/FetchUser';


function FrontPage() {
  const { userId, setUserId, user, setUser } = useGlobalContext()

  useEffect(() => {
    console.log(user)
  }, [])

  const hej = () => {
    const newMatch = {
      id: uuidv4(),
      result: "",
      time: "6/7/2023",
      league: NOLEAGUE
  }
  user.matches.unshift(newMatch)
  console.log(user)

  updateUser(user)
  }

  return (
    <div className='h-full'>
    <button onClick={hej}>hej</button>
      <div className="flex justify-center items-center h-full max-w-screen">
        <div>
          <h1 className=" text-2xl lg:text-7xl text-primary-content">Welcome to walkenhelper</h1>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
