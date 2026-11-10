
import {
  createContext,
  useContext,
  useState
} from "react";

import {
  getUsers,
  registerUser,
  saveSession,
  getSession,
  removeSession,
  deleteUser,
  updateUser,
  updatePassword
} from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(getSession());

  // USER REGISTRATION
  const register = (name, email, password) => {

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "user",
      gamesPlayed: 0
    };

    return registerUser(newUser);
  };

  // USER AND ADMIN LOGIN
  const login = (email, password) => {

    email = email.trim().toLowerCase();

    // Demo admin credentials
    if (
      email === "admin@gamezone.com" &&
      password === "Admin@123"
    ) {
      const admin = {
        id: "admin",
        name: "Administrator",
        email,
        role: "admin"
      };

      saveSession(admin);
      setCurrentUser(admin);

      return admin;
    }

    const users = getUsers();

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) return false;

    saveSession(user);
    setCurrentUser(user);

    return user;
  };

  // LOGOUT
  const logout = () => {
    removeSession();
    setCurrentUser(null);
  };

  // UPDATE PROFILE
  const updateProfile = (updatedData) => {

    if (!currentUser || currentUser.role !== "user") {
      return false;
    }

    const success = updateUser(
      currentUser.email,
      updatedData
    );

    if (!success) return false;

    const updatedUser = {
      ...currentUser,
      ...updatedData
    };

    saveSession(updatedUser);
    setCurrentUser(updatedUser);

    return true;
  };

  // DELETE OWN ACCOUNT
  const removeAccount = () => {

    if (!currentUser || currentUser.role !== "user") {
      return false;
    }

    deleteUser(currentUser.email);
    logout();

    return true;
  };

  // ADMIN DELETES USER
  const removeUser = (email) => {

    if (currentUser?.role !== "admin") {
      return false;
    }

    deleteUser(email);
    return true;
  };

  // NEW: RESET FORGOTTEN PASSWORD
  const resetPassword = (email, newPassword) => {

    return updatePassword(
      email.trim().toLowerCase(),
      newPassword
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        updateProfile,
        removeAccount,
        removeUser,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
