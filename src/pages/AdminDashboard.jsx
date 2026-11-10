
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../utils/storage";

function AdminDashboard() {

  const { logout, removeUser } = useAuth();

  const [users, setUsers] = useState(getUsers());
  const [search, setSearch] = useState("");

  const handleDelete = (email) => {

    const confirmed = window.confirm(
      `Delete the account of ${email}?`
    );

    if (confirmed) {
      removeUser(email);
      setUsers(getUsers());
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <nav>
        <h2>🎮 GameZone Admin</h2>
        <button onClick={logout}>Logout</button>
      </nav>

      <h1>Administrator Dashboard</h1>

      <div className="admin-stats">
        <div className="game-card">
          <h2>{users.length}</h2>
          <p>Total Registered Users</p>
        </div>
      </div>

      <h2>User Management</h2>

      <input
        type="search"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-container">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>

            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}

          </tbody>
        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;
