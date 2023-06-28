'use client'
import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '@/firebase/firebaseApp'
import { signInWithPopup } from 'firebase/auth'
import CathleticsPage from '../cathletics/page'
import { db } from '@/firebase/firebaseApp'
import { setDoc, doc, collection } from 'firebase/firestore'

const LoginPage = ({ setUser }) => {
  const [userEmail, setUserEmail] = useState('')
  const [user, setUserData] = useState(null)

  useEffect(() => {
    console.log(user)
  }, [user])

  const updateUser = async (user) => {
    const userRef = collection(db, "users")
    await setDoc(doc(userRef, user.email.toString()), user)
  }

  const addUser = async () => {
    const newUser = {
      email: userEmail,
      cats: [],
      matches: [],
    }
    setUserData(newUser)
    await updateUser(newUser)
  }

  const handleClick = () => {
    signInWithPopup(auth, googleAuthProvider).then(async(result) => {
      console.log(result)
      setUserEmail(result.user.email)
      localStorage.setItem('email', result.user.email)
      addUser()
      window.location.reload()
    })
  }

  return (
    <div>
      <button onClick={handleClick}>Sign in with Google</button>
    </div>
  )
}

export default LoginPage