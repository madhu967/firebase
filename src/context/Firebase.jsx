import { createContext, useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBj2nkpGT2J_ZPuhbjkoIzUzmLtqhFKfF8",
  authDomain: "eternal-concept-472518-i0.firebaseapp.com",
  projectId: "eternal-concept-472518-i0",
  storageBucket: "eternal-concept-472518-i0.appspot.com", // ✅ fixed
  messagingSenderId: "1097703156042",
  appId: "1:1097703156042:web:b1b945a8d28b1acfff39b3",
  measurementId: "G-B57B9TPVZV",
  databaseURL: "https://eternal-concept-472518-i0-default-rtdb.firebaseio.com",
};

// ✅ Prevent duplicate app error
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signInUserWithEmailAndPassword, putData }}>
      {children}
    </FirebaseContext.Provider>
  );
};
