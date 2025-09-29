import { getDatabase,ref,set} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {app} from "../firebase";

import React from 'react'
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const db=getDatabase(app);
const auth=getAuth(app);

const App = () => {

  const putData =()=>{
    set(ref(db,"users/madhu"),{
      id:1,
      name:"Madhu",
      age: 25,
      email: "madhu@example.com"
    });
  }

  const signupUser=()=>{
    createUserWithEmailAndPassword(
      auth,
      "ijjimadhu@gmail.com",
      "ijjimadhu@1234"
    ).then((value)=>console.log(value));
  }

  return (
    <div>
      {/* <h1>Firebase Realtime Database</h1>
      <button onClick={putData}>Put Data</button>
      <button onClick={signupUser}>Sign Up</button> */}
      <SignUp></SignUp>
      <SignIn></SignIn>
    </div>

  )
}

export default App