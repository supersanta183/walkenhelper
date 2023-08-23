import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { getMetadata, getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import fetchUser from "@/components/FetchUser";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(clientCredentials);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const uid = result.user.uid;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        localStorage.setItem("userid", uid);
        if (
          result.user.metadata.creationTime ===
          result.user.metadata.lastSignInTime
        ) {
          const user = {
            id: uid,
            name: name,
            email: email,
            cats: [],
            matches: [],
          };

          try {
            userRef = collection(db, "users");
            setDoc(doc(userRef, uid.toString()), user);
          } catch (error) {
            console.log("Error adding user to the database", error);
          }
        }
        console.log("signed in succesfully");
        resolve(result)
      })
      .catch((error) => {
        console.log("error signing in ", error);
        reject(error)
      });
  });
};

const SignoutWithGoogle = async () => {
  signOut(auth)
    .then(() => {
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("profilePic", "");
      localStorage.setItem("userid", "");
      console.log("Signed out succesfully");
    })
    .catch((error) => {
      console.log("Error, could not sign out: ", error);
    });
};

export {
  db,
  storage,
  auth,
  googleAuthProvider,
  signInWithGoogle,
  SignoutWithGoogle,
};
