import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase';

const auth=getAuth(app);


const SignIn = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const signInUser=()=>{
        signInWithEmailAndPassword(auth,email,password).then((value)=>alert("SignIn success"))
        .catch((err)=>alert(err));
    }

  return (
    <div className='signin-page'>
        <h1>Sign In</h1>
        <label htmlFor="">Enter your email</label>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="" id="" placeholder='Enter your email' />
        <label htmlFor="">Enter your Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Enter your password' />
        <button onClick={signInUser}>Signin</button>
    </div>
  )
}

export default SignIn