import { db } from '@/firebase/firebaseApp'
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'

import { backupCat } from './FetchCats'


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

const deleteCat = async (user, cat) => {
    cat.user = user.name
    backupCat(cat)

    const cats = user.cats
    if(cats.length === 1) {
        user.cats = []
        await updateUser(user)
        return
    }
    cats.forEach((element, index) => {
        if(element.id === cat.id) {
            cats.splice(index, index)
            return
        }
    });
    user.cats = cats

    await updateUser(user)
}

export default fetchUser
export { updateUser, deleteCat }