import { db } from '@/firebase/firebaseApp'
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'


const fetchCats = async () => {
  const catRef = collection(db, "cats")
  const catSnapshot = await getDocs(catRef)
  const catList = catSnapshot.docs.map(doc => doc.data())
  
  return catList
}

const backupCat = async (cat) => {
  const catRef = collection(db, "cats")
  await setDoc(doc(catRef, cat.id.toString()), cat)
}

export default fetchCats
export { backupCat }