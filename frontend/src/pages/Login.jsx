import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../index.css";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", { email, password });
      navigate("/leads"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card-container">
      <h2 className="card-title">Login</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
        <button type="submit" className="submit-btn">
          Login
        </button>

        <div className="have-account">
        <h3></h3>
          Don't have an Account? <a href="/register" className="sign-in">Register Now</a>
        </div>

      </form>
    </div>
  );

}