# WriteSpace

A modern blogging platform built with React and Vite. Write, share, and discover stories in a clean, intuitive interface.

## Features

- **User Authentication** — Register, login, and session management using localStorage
- **Blog Management** — Create, read, edit, and delete blog posts
- **Admin Dashboard** — Overview stats, recent posts, and quick actions for admin users
- **User Management** — Admins can create and delete user accounts
- **Role-Based Access Control** — Protected routes for authenticated users and admin-only pages
- **Responsive Design** — Fully responsive UI built with Tailwind CSS
- **Landing Page** — Public-facing page with feature highlights and latest posts

## Tech Stack

- **React 18** — UI library
- **Vite 6** — Build tool and dev server
- **React Router DOM 6** — Client-side routing
- **Tailwind CSS 3** — Utility-first CSS framework
- **PostCSS + Autoprefixer** — CSS processing
- **localStorage** — Client-side data persistence

## Project Structure

```
writespace-blog/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Avatar.jsx
    │   ├── BlogCard.jsx
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── PublicNavbar.jsx
    │   ├── StatCard.jsx
    │   └── UserRow.jsx
    ├── pages/
    │   ├── AdminDashboard.jsx
    │   ├── Home.jsx
    │   ├── LandingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── ReadBlog.jsx
    │   ├── RegisterPage.jsx
    │   ├── UserManagement.jsx
    │   └── WriteBlog.jsx
    └── utils/
        ├── auth.js
        └── storage.js
```

## Setup

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Route Map

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | LandingPage | Public | Landing page with features and latest posts |
| `/login` | LoginPage | Public | User login form |
| `/register` | RegisterPage | Public | User registration form |
| `/blogs` | Home | Authenticated | All blog posts listing |
| `/write` | WriteBlog | Authenticated | Create a new blog post |
| `/edit/:id` | WriteBlog | Authenticated | Edit an existing blog post |
| `/blog/:id` | ReadBlog | Authenticated | Read a single blog post |
| `/dashboard` | AdminDashboard | Admin only | Admin overview with stats and recent posts |
| `/users` | UserManagement | Admin only | Create and manage user accounts |

## localStorage Schema

All data is persisted in the browser's localStorage under the following keys:

### `writespace_users`

Array of user objects.

```json
[
  {
    "id": "uuid",
    "displayName": "John Doe",
    "username": "johndoe",
    "password": "plaintext",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `writespace_posts`

Array of blog post objects.

```json
[
  {
    "id": "uuid",
    "title": "Post Title",
    "content": "Post content...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "authorId": "uuid",
    "authorName": "John Doe",
    "authorRole": "user"
  }
]
```

### `writespace_session`

Current authenticated user session.

```json
{
  "userId": "uuid",
  "username": "johndoe",
  "displayName": "John Doe",
  "role": "user"
}
```

### Default Admin Account

A built-in admin account is available with the following credentials:

- **Username:** `admin`
- **Password:** `admin123`

## Deployment

### Vercel

This project is configured for deployment on Vercel with SPA routing support.

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Vercel will auto-detect the Vite framework and apply the correct build settings:
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
4. Deploy. The included `vercel.json` handles client-side routing rewrites automatically.

Alternatively, deploy via the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## License

Private — All rights reserved.