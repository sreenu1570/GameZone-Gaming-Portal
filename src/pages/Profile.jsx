
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {

  const {
    currentUser,
    updateProfile,
    removeAccount
  } = useAuth();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    const success = updateProfile({
      name: name.trim(),
      email: email.trim().toLowerCase()
    });

    if (success) {
      alert("Profile updated successfully!");
    } else {
      alert("Email already exists!");
    }
  };

  const handleDelete = () => {

    const confirmed = window.confirm(
      "Permanently delete your account?"
    );

    if (confirmed) {
      removeAccount();
      navigate("/");
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleUpdate}>

        <h1>My Profile</h1>

        <label>Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email Address</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Update Profile
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete My Account
        </button>

        <Link to="/dashboard">
          Back to Dashboard
        </Link>

      </form>

    </div>
  );
}

export default Profile;
