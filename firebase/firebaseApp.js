import { initializeApp } from 'firebase/app'
import { getDoc, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setDoc, collection, doc, getDocs, query, where } from 'firebase/firestore'

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


const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const uid = result.user.uid;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        localStorage.setItem("userid", uid);
        let userRef = query(collection(db, "users"), where("id", "==", uid));
        const querySnapshot = await getDocs(userRef);
        if(!querySnapshot) {
            return
        }

        const user = {
            id: uid,
            name: name,
            email: email,
            cats: [],
            matches: [],
        };

        userRef = collection(db, "users")
        await setDoc(doc(userRef, uid.toString()), user);

    } catch (error) {
        console.log("Error logging in:", error);
    }
}

export { db, storage, auth, googleAuthProvider, signInWithGoogle }