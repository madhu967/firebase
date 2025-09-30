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
      const uid = userCredential.user.uid; // ✅ safe key

      // Save only email (not password)
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

      // Save user info to DB
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
    <div>
      <h1>Firebase Auth + DB</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Enter Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Enter Password"
      />
      <button onClick={handleGoogleLogin}>Signin With Google</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default App;
