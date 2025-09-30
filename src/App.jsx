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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default App;
