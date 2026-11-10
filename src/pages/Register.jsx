
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (email.trim().toLowerCase() === "admin@gamezone.com") {
      setError("This email is reserved for the administrator.");
      return;
    }

    const success = register(name, email, password);

    if (success) {
      alert("Registration successful! Please login.");
      navigate("/");
    } else {
      setError("This email is already registered.");
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleRegister}>

        <h1>🎮 GameZone</h1>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Create Account</button>

        <p>
          Already registered?
          <Link to="/"> Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Register;
