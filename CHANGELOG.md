# Changelog

All notable changes to the WriteSpace project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2024-01-01

### Added

- **Public Landing Page** — Welcome page with hero section, feature highlights, and latest posts preview for unauthenticated visitors.
- **User Authentication** — Login and registration forms with client-side session management using localStorage.
- **Role-Based Access Control** — Protected routes for authenticated users and admin-only pages via the `ProtectedRoute` component.
- **Blog CRUD** — Full create, read, edit, and delete functionality for blog posts.
  - Write new posts with title and content fields, including character limits (100 for title, 5000 for content).
  - Read individual posts with author info and formatted dates.
  - Edit existing posts (available to post author and admin users).
  - Delete posts with confirmation dialog (available to post author and admin users).
- **Admin Dashboard** — Overview page for admin users featuring:
  - Stat cards displaying total posts, total users, and admin's own post count.
  - Quick action buttons for writing posts, managing users, and viewing all posts.
  - Recent posts list with edit and delete actions.
- **User Management** — Admin-only page to create new user accounts and delete existing users, with protection against deleting the built-in admin account or the current user.
- **Avatar System** — Role-based avatar component displaying a crown emoji (👑) for admin users and a book emoji (📖) for regular users.
- **Responsive Tailwind UI** — Fully responsive interface built with Tailwind CSS 3, including:
  - Mobile-friendly navigation with hamburger menu toggle.
  - Responsive grid layouts for blog cards and stat cards.
  - Mobile card views and desktop table views for user management.
  - Public navbar for unauthenticated pages and authenticated navbar with role-aware links.
- **Blog Card Component** — Reusable card displaying post title, truncated content, author avatar, author name, and formatted date with an edit link for authorized users.
- **Stat Card Component** — Reusable card with configurable title, value, icon, and color theme for dashboard metrics.
- **localStorage Persistence** — All application data stored in the browser's localStorage under the following keys:
  - `writespace_users` — Array of user objects with id, displayName, username, password, role, and createdAt.
  - `writespace_posts` — Array of post objects with id, title, content, createdAt, authorId, authorName, and authorRole.
  - `writespace_session` — Current authenticated user session with userId, username, displayName, and role.
- **Default Admin Account** — Built-in admin credentials (username: `admin`, password: `admin123`) for initial access.
- **Vercel Deployment** — Configuration for Vercel hosting with SPA routing rewrites via `vercel.json`.
- **Vite 6 Build Tooling** — Development server and production build powered by Vite with the React plugin.
- **PostCSS + Autoprefixer** — CSS processing pipeline for Tailwind CSS compilation and vendor prefixing.