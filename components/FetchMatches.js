import React from 'react'
import { useState } from 'react'
import { db } from '@/firebase/firebaseApp'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'


const fetchMatches = async () => {
  const matchRef = collection(db, "matches")
  const catSnapshot = await getDocs(matchRef)
  const catList = catSnapshot.docs.map(doc => doc.data())[0].matches
  
  return catList
}

const handleAddMatch = async (matches) => {
    const matchRef = collection(db, "matches")
    await setDoc(doc(matchRef, "matches"), {matches: matches})
}

export default fetchMatches
export { handleAddMatch }