import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignup
  ? `${process.env.REACT_APP_API_URL}/api/auth/signup`
  : `${process.env.REACT_APP_API_URL}/api/auth/login`;

      const payload = isSignup
        ? { username, email, password }
        : { email: username, password };

      const res = await axios.post(endpoint, payload);
      alert(res.data.message);

      if (res.data.token) {
        login(res.data.token); // Instantly update login state
      }

      navigate("/"); // Redirect to home after login/signup
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={isSignup ? email : username}
          onChange={(e) =>
            isSignup ? setEmail(e.target.value) : setUsername(e.target.value)
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
          }}
        >
          {isSignup ? "Login here" : "Sign up here"}
        </button>
      </p>
    </div>
  );
}

export default Login;
