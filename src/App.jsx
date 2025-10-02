import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { FirebaseProvider } from "./context/Firebase";
import { messaging } from './firebase';
import { getToken,onMessage  } from 'firebase/messaging';

function App() {

   async function requestPermission(){
    const permission =await Notification.requestPermission();
    if(permission === 'granted'){
      //Generate Token
      const token = await getToken(messaging,{vapidKey: 'BIQkjtnYvNAyK_nZAk9UNI6DdEQfyAb8FON3-7BPOAm9GaMT2nsD1M7Wqg99bH5U4abO-cHtXkSDzmSg2czfdWw'});
      console.log("Token Gen ",token );
    }
    else if (permission === 'denied'){
      alert("You denied for the notifications");
    }

  }

  useEffect(() => {
    requestPermission();

    // Foreground notifications
    onMessage(messaging, (payload) => {
      console.log("Foreground message:", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
  }, []);
  
  
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
