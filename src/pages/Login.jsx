import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Enter both email and password");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await firebase.signupUserWithEmailAndPassword(email, password);
      await firebase.putData("users/" + userCredential.user.uid, { email });
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter both email and password");
      return;
    }
    try {
      await firebase.signInUserWithEmailAndPassword(email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await firebase.signInWithGoogle();
      const user = result.user;
      await firebase.putData("users/" + user.uid, {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
      alert("Google login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Firebase Auth</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 mb-3 transition"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-3 transition"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
