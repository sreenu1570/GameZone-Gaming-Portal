
import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    setError("");

    const user = login(email, password);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleLogin}
      >

        <h1>🎮 GameZone</h1>

        <h2>Welcome Back</h2>

        {error && (
          <p className="error">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-link">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?

          <Link to="/register">
            {" "}Sign Up
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Login;
