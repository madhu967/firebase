import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Dashboard = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
 

  

  const handleLogout = async () => {
    try {
      await firebase.logout();
      navigate("/");
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <p className="text-gray-700">
              View and edit your personal information here.
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <p className="text-gray-700">
              Track your active projects and tasks easily.
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-2">Analytics</h2>
            <p className="text-gray-700">
              Check your performance stats and insights.
            </p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-2">Settings</h2>
            <p className="text-gray-700">
              Customize your preferences and application settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
