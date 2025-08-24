import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { 
        firstName,
        lastName,
        email, 
        password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card-container">
      <h2 className="card-title">Register Now</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          autoComplete="given-name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="form-input"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="form-input"
        />

        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
           autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
        <button type="submit" className="submit-btn">
          Register
        </button>

        <div className="have-account">
        <h3></h3>
          Have account? <a href="/login" className="sign-in">Sign In</a>
        </div>

      </form>
    </div>
  );
}


