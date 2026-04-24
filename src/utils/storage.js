const USERS_KEY = 'writespace_users';
const POSTS_KEY = 'writespace_posts';
const SESSION_KEY = 'writespace_session';

// Users

export function getUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addUser(user) {
  const users = getUsers();
  const duplicate = users.some((u) => u.username === user.username);
  if (duplicate) {
    throw new Error('Username already exists');
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function deleteUser(userId) {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);
  if (filtered.length === users.length) {
    return false;
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
  return true;
}

// Posts

export function getPosts() {
  try {
    const data = localStorage.getItem(POSTS_KEY);
    const posts = data ? JSON.parse(data) : [];
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch {
    return [];
  }
}

export function addPost(post) {
  const posts = getPosts();
  posts.push(post);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return true;
}

export function editPost(postId, updates) {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) {
    return false;
  }
  posts[index] = { ...posts[index], ...updates };
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return true;
}

export function deletePost(postId) {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== postId);
  if (filtered.length === posts.length) {
    return false;
  }
  localStorage.setItem(POSTS_KEY, JSON.stringify(filtered));
  return true;
}

// Session

export function getSession() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}