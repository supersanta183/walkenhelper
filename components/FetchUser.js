import { db } from '@/firebase/firebaseApp'
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'


const fetchUser = async (user) => {
    if (!user) return
    const userRef = query(collection(db, "users"), where("name", "==", user))
    const result = await getDocs(userRef)
    return result.docs[0].data()
}

const updateUser = async (user) => {
    const userRef = collection(db, "users")
    await setDoc(doc(userRef, user.id.toString()), user)
}

export default fetchUser
export { updateUser }