
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  AuthProvider,
  useAuth
} from "./context/Authcontext";

import ProtectedRoute from "./components/Protectedroute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";

import TicTacToe from "./games/TicTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import GuessNumber from "./games/GuessNumber";

import "./App.css";

// Redirect according to user role
function HomeRedirect() {

  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Navigate
      to={
        currentUser.role === "admin"
          ? "/admin"
          : "/dashboard"
      }
      replace
    />
  );
}

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* Login */}
          <Route
            path="/"
            element={<HomeRedirect />}
          />

          {/* Registration */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* NEW: Forgot Password */}
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Admin Module */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User Module */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Games */}
          <Route
            path="/game/tictactoe"
            element={
              <ProtectedRoute role="user">
                <TicTacToe />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game/rps"
            element={
              <ProtectedRoute role="user">
                <RockPaperScissors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game/guess"
            element={
              <ProtectedRoute role="user">
                <GuessNumber />
              </ProtectedRoute>
            }
          />

          {/* Invalid route */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;
