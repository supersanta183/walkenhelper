import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(clientCredentials)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider).then((result) => {
        const name = result.user.displayName
        const email = result.user.email
        const profilePic = result.user.photoURL

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("profilePic", profilePic)
        console.log(result)
    }).catch((err) => {
        console.log("error logging in")
        console.log(err)
    })
}

export { db, storage, auth, googleAuthProvider, signInWithGoogle }