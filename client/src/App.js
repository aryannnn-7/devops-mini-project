import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import LegalRights from "./pages/LegalRights";
import Flashcards from "./pages/Flashcards";
import Quizzes from "./pages/Quizzes";
import FG1 from "./pages/FG1";
import FG2 from "./pages/FG2";
import Helpline from "./pages/Helpline";


import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();

  // Hide navbar on all flashcard game stages
  const hideNavbar =
    location.pathname.startsWith("/flashcards/fg1") ||
    location.pathname.startsWith("/flashcards/fg2");

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/legal-rights" element={<LegalRights />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/flashcards/fg1" element={<FG1 />} />
        <Route path="/flashcards/fg2" element={<FG2 />} />
        <Route path="/help" element={<Helpline />} />
      </Routes>
    </AuthProvider>
  );
}

export default App; 
