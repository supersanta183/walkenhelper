"use client"
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase/firebaseApp'
import { setDoc, doc, collection } from 'firebase/firestore'
import fetchCats from '@/components/FetchCats'
import fetchMatches from '@/components/FetchMatches';

function FrontPage() {

  const test = async () => {

    const user = {
      id: uuidv4(),
      name: "Bjarke",
      cats: [],
      matches: [],
    }

    const user2 = {
      id: uuidv4(),
      name: "Emil",
      cats: [],
      matches: [],
    }

    await fetchCats().then(async (data) => {
      user2.cats = data
    })

    await fetchMatches().then(async (data) => {
      user2.matches = data
    })

    const userRef = collection(db, "users")
    await setDoc(doc(userRef, user.id.toString()), user)
    await setDoc(doc(userRef, user2.id.toString()), user2)
  }

  return (
    <div className='h-full'>
      <div className="flex justify-center items-center h-full max-w-screen">
        <div>
          <h1 className=" text-2xl lg:text-7xl text-primary-content">Welcome to walkenhelper</h1>
          <button onClick={test} className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
