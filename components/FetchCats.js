import { db } from '@/firebase/firebaseApp'
import { collection, getDocs } from 'firebase/firestore'


const fetchCats = async () => {
  const catRef = collection(db, "cats")
  const catSnapshot = await getDocs(catRef)
  const catList = catSnapshot.docs.map(doc => doc.data())
  
  return catList
}

export default fetchCats