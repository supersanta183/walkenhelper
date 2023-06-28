import React from 'react'
import { useState } from 'react'
import { db } from '@/firebase/firebaseApp'
import { collection, getDocs, query, where } from 'firebase/firestore'


const fetchUser = async (user) => {
    if(!user) return
    const userRef = query(collection(db, "users"), where("name", "==", user))
    const fetchedUser = await getDocs(userRef)

    return fetchedUser.docs[0].data()
}

export default fetchUser