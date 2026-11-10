
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {

  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (role && currentUser.role !== role) {
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

  return children;
}

export default ProtectedRoute;
