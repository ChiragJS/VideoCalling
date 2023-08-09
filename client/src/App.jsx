import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react'
import { LandingPage } from "./components/LandingPage";
import { MeetingPage } from "./components/MeetingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Meeting from "./components/Meeting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meeting/:roomId" element={<MeetingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
