import { db } from '@/firebase/firebaseApp'
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'


const fetchUser = async (user) => {
    if (!user) return
    const userRef = query(collection(db, "users"), where("name", "==", user))
    const fetchedUser = await getDocs(userRef)

    return fetchedUser.docs[0].data()
}

const updateUser = async (user) => {
    console.log(user)
    const userRef = collection(db, "users")
    await setDoc(doc(userRef, user.id.toString()), user)
}

export default fetchUser
export { updateUser }