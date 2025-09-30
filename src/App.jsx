import React, { useState } from "react";
import { useFirebase } from "./context/Firebase";

const App = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const userCredential = await firebase.signupUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      await firebase.putData("users/" + uid, { email });

      alert("Signup successful!");
      console.log("User signed up:", userCredential);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in instead.");
      } else {
        alert("Signup failed: " + err.message);
      }
      console.error("Error signing up:", err);
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
      console.log("Google User:", user);
    } catch (error) {
      console.error("Google login error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Firebase Auth + DB</h1>
        
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter Email"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter Password"
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
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default App;
