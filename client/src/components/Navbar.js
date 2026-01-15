import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/legal-rights">Legal Rights</Link>
      <Link to="/flashcards">Flashcards</Link>
      <Link to="/quizzes">Quizzes</Link>

      {isLoggedIn ? (
        <span
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          <FaUserCircle size={22} /> Logout
        </span>
      ) : (
        <Link to="/login">Login / Sign Up</Link>
      )}
    </nav>
  );
}

export default Navbar;
