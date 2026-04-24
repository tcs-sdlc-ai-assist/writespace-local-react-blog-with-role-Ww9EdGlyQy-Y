import { getUsers, addUser, getSession, setSession, clearSession } from './storage';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export function login(username, password) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const session = {
      userId: 'admin',
      username: 'admin',
      displayName: 'Admin',
      role: 'admin',
    };
    setSession(session);
    return session;
  }

  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const session = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  };
  setSession(session);
  return session;
}

export function register(displayName, username, password) {
  const id = crypto.randomUUID();
  const user = {
    id,
    displayName,
    username,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  if (username === ADMIN_CREDENTIALS.username) {
    throw new Error('Username already exists');
  }

  addUser(user);

  const session = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  };
  setSession(session);
  return session;
}

export function logout() {
  clearSession();
}

export function isAuthenticated() {
  return getSession() !== null;
}

export function isAdmin() {
  const session = getSession();
  return session !== null && session.role === 'admin';
}

export function getCurrentUser() {
  return getSession();
}