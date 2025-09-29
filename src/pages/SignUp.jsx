import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../firebase';

const auth=getAuth();

const SignUp = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const createUser =()=>{
        createUserWithEmailAndPassword(auth,email,password).then((value)=>alert("Success")).catch((err)=>alert(err));
    }
  return (
    
    <div className='signup-page'>
        <h1>SignUp Page</h1>
        <label htmlFor="">Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="" id="" placeholder='Enter your Email' required />
        <label htmlFor="">Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Enter your Password' required />
        <button onClick={createUser}>SignUp</button>
    </div>
  )
}

export default SignUp