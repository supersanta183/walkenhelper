"use client";
import { db } from "@/firebase/firebaseApp";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

const GlobalContext = createContext({
  userId: "",
  setUserId: () => "",
  user: {},
  setUser: () => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  const updateUser = async (user) => {
    setUser(user)
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, user.id.toString()), user);
  };

  return (
    <GlobalContext.Provider value={{ userId, setUserId, user, setUser, updateUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
