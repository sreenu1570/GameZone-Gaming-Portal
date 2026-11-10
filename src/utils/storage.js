
const USERS_KEY = "gamezone_users";
const SESSION_KEY = "gamezone_session";

// Get registered users
export function getUsers() {
  try {
    return JSON.parse(
      localStorage.getItem(USERS_KEY)
    ) || [];
  } catch {
    return [];
  }
}

// Save users
export function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

// Register user
export function registerUser(user) {
  const users = getUsers();

  const exists = users.some(
    (u) => u.email === user.email
  );

  if (exists) return false;

  users.push(user);
  saveUsers(users);

  return true;
}

// Update user profile
export function updateUser(email, updatedData) {
  const users = getUsers();

  const exists = users.some(
    (u) =>
      u.email === updatedData.email &&
      u.email !== email
  );

  if (exists) return false;

  const updatedUsers = users.map((u) =>
    u.email === email
      ? { ...u, ...updatedData }
      : u
  );

  saveUsers(updatedUsers);
  return true;
}

// NEW: Reset password
export function updatePassword(email, newPassword) {
  const users = getUsers();

  const userExists = users.some(
    (u) => u.email === email
  );

  if (!userExists) return false;

  const updatedUsers = users.map((user) =>
    user.email === email
      ? { ...user, password: newPassword }
      : user
  );

  saveUsers(updatedUsers);

  return true;
}

// Delete user
export function deleteUser(email) {
  const users = getUsers();

  const updatedUsers = users.filter(
    (u) => u.email !== email
  );

  saveUsers(updatedUsers);
}

// Save login session without password
export function saveSession(user) {
  const { password, ...safeUser } = user;

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(safeUser)
  );
}

// Get current session
export function getSession() {
  try {
    return JSON.parse(
      localStorage.getItem(SESSION_KEY)
    );
  } catch {
    return null;
  }
}

// Logout
export function removeSession() {
  localStorage.removeItem(SESSION_KEY);
}
