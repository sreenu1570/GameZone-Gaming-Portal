
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function UserDashboard() {

  const { currentUser, logout } = useAuth();

  return (
    <div className="dashboard">

      <nav>
        <h2>🎮 GameZone</h2>

        <div>
          <Link to="/profile">My Profile</Link>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="welcome">
        <h1>Welcome, {currentUser?.name}!</h1>
        <p>Choose your favourite game and start playing.</p>
      </section>

      <h2>Available Games</h2>

      <div className="game-container">

        <div className="game-card">
          <h3>⭕ Tic-Tac-Toe</h3>
          <p>Challenge your friend.</p>
          <Link to="/game/tictactoe">Play Now →</Link>
        </div>

        <div className="game-card">
          <h3>✂️ Rock Paper Scissors</h3>
          <p>Play against the computer.</p>
          <Link to="/game/rps">Play Now →</Link>
        </div>

        <div className="game-card">
          <h3>🔢 Number Guessing</h3>
          <p>Guess the hidden number.</p>
          <Link to="/game/guess">Play Now →</Link>
        </div>

      </div>

      <section className="profile-section">

        <h2>Account Overview</h2>

        <p>Name: {currentUser?.name}</p>
        <p>Email: {currentUser?.email}</p>
        <p>Role: {currentUser?.role}</p>

        <Link to="/profile">
          Manage My Account →
        </Link>

      </section>

    </div>
  );
}

export default UserDashboard;
