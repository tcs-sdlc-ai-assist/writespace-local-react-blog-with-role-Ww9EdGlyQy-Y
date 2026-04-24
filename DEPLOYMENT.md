# Deployment Guide

This document covers everything you need to know about deploying WriteSpace to production using Vercel.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Vercel Deployment](#vercel-deployment)
  - [Option 1: GitHub Integration (Recommended)](#option-1-github-integration-recommended)
  - [Option 2: Vercel CLI](#option-2-vercel-cli)
- [vercel.json Configuration](#verceljson-configuration)
- [Environment Variables](#environment-variables)
- [CI/CD via Vercel GitHub Integration](#cicd-via-vercel-github-integration)
- [Troubleshooting](#troubleshooting)
  - [SPA Routing Issues](#spa-routing-issues)
  - [Blank Page After Deployment](#blank-page-after-deployment)
  - [Build Failures](#build-failures)
  - [Assets Not Loading](#assets-not-loading)
- [Other Hosting Providers](#other-hosting-providers)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)

---

## Overview

WriteSpace is a static single-page application (SPA) built with React 18 and Vite 6. It has no server-side dependencies — all data is persisted in the browser's `localStorage`. This means deployment is straightforward: build the static assets and serve them from any static hosting provider.

**Key characteristics:**

- **No backend server required** — The app runs entirely in the browser.
- **No database** — All data (users, posts, sessions) is stored in `localStorage`.
- **No environment variables** — There are no API keys, secrets, or server URLs to configure.
- **SPA routing** — React Router DOM handles client-side routing, which requires a rewrite/redirect rule on the hosting provider to serve `index.html` for all routes.

---

## Prerequisites

- **Node.js 18+** and **npm** installed locally
- A **GitHub**, **GitLab**, or **Bitbucket** account (for CI/CD integration)
- A **Vercel** account — free tier is sufficient ([vercel.com](https://vercel.com))

---

## Build Configuration

WriteSpace uses Vite as its build tool. The relevant scripts are defined in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the local development server at `http://localhost:5173` |
| `npm run build` | Creates an optimized production build in the `dist/` directory |
| `npm run preview` | Serves the production build locally for testing |

### Building for Production

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

After running `npm run build`, the `dist/` directory will contain:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
```

### Previewing the Production Build

Before deploying, you can verify the production build locally:

```bash
npm run preview
```

This serves the `dist/` directory at `http://localhost:4173`. Test all routes, authentication, and blog functionality to confirm everything works as expected.

---

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

This is the easiest and most maintainable approach. Vercel will automatically build and deploy your app on every push.

1. **Push your code to a Git repository** on GitHub, GitLab, or Bitbucket.

2. **Import the project in Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your Git provider and authorize Vercel if prompted.
   - Choose the `writespace-blog` repository.

3. **Configure build settings:**
   Vercel will auto-detect the Vite framework. Verify the following settings:

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Vite |
   | **Build Command** | `vite build` |
   | **Output Directory** | `dist` |
   | **Install Command** | `npm install` |
   | **Node.js Version** | 18.x (or later) |

4. **Click Deploy.**
   Vercel will install dependencies, run the build, and deploy the static output. You'll receive a production URL (e.g., `https://writespace-blog.vercel.app`).

5. **Custom domain (optional):**
   - Go to your project's **Settings → Domains** in the Vercel dashboard.
   - Add your custom domain and follow the DNS configuration instructions.

### Option 2: Vercel CLI

For manual or scripted deployments:

```bash
# Install the Vercel CLI globally
npm install -g vercel

# Navigate to the project root
cd writespace-blog

# Deploy (follow the interactive prompts)
vercel
```

On first run, the CLI will ask you to:
- Log in to your Vercel account
- Link to an existing project or create a new one
- Confirm the build settings

For subsequent deployments:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## vercel.json Configuration

The project includes a `vercel.json` file at the repository root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### What This Does

WriteSpace uses client-side routing via React Router DOM. When a user navigates to a route like `/blogs` or `/blog/some-id`, the browser sends a request to the server for that path. Without the rewrite rule, the server would return a 404 because no file exists at `/blogs` or `/blog/some-id` — only `index.html` and the hashed asset files exist in the `dist/` directory.

The rewrite rule tells Vercel: **for any URL path, serve `index.html`**. Once `index.html` loads, React Router takes over and renders the correct page component based on the URL.

### Why Rewrites Instead of Redirects

- **Rewrites** serve `index.html` while keeping the original URL in the browser's address bar. A request to `/blogs` returns the contents of `/index.html`, but the URL stays as `/blogs`.
- **Redirects** would change the URL to `/index.html`, breaking the routing experience.

### Static Assets Are Unaffected

Vite's production build outputs JavaScript and CSS files into the `assets/` directory with hashed filenames (e.g., `assets/index-abc123.js`). Vercel serves these files directly because they exist as real files on disk — the rewrite rule only applies when no matching file is found.

---

## Environment Variables

**WriteSpace does not require any environment variables.**

The application has no external API integrations, no backend server, and no secrets to configure. All data is stored in the browser's `localStorage` using the following keys:

| Key | Description |
|-----|-------------|
| `writespace_users` | Array of user objects |
| `writespace_posts` | Array of blog post objects |
| `writespace_session` | Current authenticated user session |

The default admin account credentials (`admin` / `admin123`) are hardcoded in `src/utils/auth.js`. Since this is a client-side-only demo application, there are no security implications for server-side secrets.

If you extend WriteSpace in the future to include a backend API, you can add environment variables in the Vercel dashboard under **Settings → Environment Variables** and access them in Vite using the `VITE_` prefix:

```javascript
// Example (not currently used)
const apiUrl = import.meta.env.VITE_API_URL;
```

Only variables prefixed with `VITE_` are exposed to the client-side bundle by Vite.

---

## CI/CD via Vercel GitHub Integration

When you connect your GitHub repository to Vercel, you get automatic CI/CD out of the box:

### Automatic Deployments

| Trigger | Deployment Type | URL |
|---------|----------------|-----|
| Push to `main` (or default branch) | **Production** | `https://your-project.vercel.app` |
| Push to any other branch | **Preview** | `https://your-project-git-branch-name.vercel.app` |
| Pull request opened/updated | **Preview** | Unique URL posted as a PR comment |

### How It Works

1. You push code to GitHub.
2. Vercel detects the push via a webhook.
3. Vercel runs `npm install` followed by `vite build`.
4. If the build succeeds, the contents of `dist/` are deployed.
5. Vercel posts the deployment URL as a commit status check (and as a PR comment for pull requests).

### Branch Protection

For team workflows, you can configure branch protection rules in GitHub to require successful Vercel preview deployments before merging pull requests:

1. Go to your GitHub repository's **Settings → Branches**.
2. Add a branch protection rule for `main`.
3. Enable **Require status checks to pass before merging**.
4. Select the **Vercel** status check.

### Skipping Deployments

To skip a deployment for a specific commit, include `[skip ci]` or `[vercel skip]` in your commit message:

```bash
git commit -m "Update README [skip ci]"
```

### Build Caching

Vercel caches `node_modules` between deployments to speed up builds. If you encounter stale dependency issues, you can clear the cache:

1. Go to your project's **Settings → General** in the Vercel dashboard.
2. Scroll to **Build & Development Settings**.
3. Click **Override** next to the Install Command and set it to `npm ci` (which performs a clean install).

Alternatively, trigger a redeployment from the Vercel dashboard with the **Redeploy** button and check **Clear Build Cache**.

---

## Troubleshooting

### SPA Routing Issues

**Symptom:** Navigating directly to a route like `/blogs` or `/blog/some-id` returns a 404 page or a blank page.

**Cause:** The hosting provider is looking for a file at that path instead of serving `index.html`.

**Solution:** Ensure the `vercel.json` rewrite rule is present at the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Verify that:
- The file is named exactly `vercel.json` (not `vercel.config.json` or similar).
- The file is in the repository root, not inside `src/` or `dist/`.
- The file is committed to Git and pushed to the remote repository.

### Blank Page After Deployment

**Symptom:** The deployed site shows a blank white page with no content.

**Possible causes and solutions:**

1. **Check the browser console** for JavaScript errors. Open DevTools (F12) and look at the Console tab.

2. **Verify the build output.** Run `npm run build` locally and check that the `dist/` directory contains `index.html` and an `assets/` folder with `.js` and `.css` files.

3. **Check the base path.** If you're deploying to a subdirectory (e.g., `https://example.com/blog/`), you need to set the `base` option in `vite.config.js`:

   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/blog/',
   })
   ```

   For root-level deployments on Vercel, the default `base: '/'` is correct and no changes are needed.

4. **Preview locally first.** Run `npm run preview` and confirm the app works at `http://localhost:4173` before deploying.

### Build Failures

**Symptom:** The Vercel deployment fails during the build step.

**Common causes:**

1. **Node.js version mismatch.** Ensure Vercel is using Node.js 18 or later. You can specify the version in the Vercel dashboard under **Settings → General → Node.js Version**, or add an `engines` field to `package.json`:

   ```json
   {
     "engines": {
       "node": ">=18"
     }
   }
   ```

2. **Missing dependencies.** Run `npm install` and `npm run build` locally to verify the build succeeds before pushing.

3. **Import errors.** Ensure all import paths are correct and use the proper file extensions. Vite requires `.jsx` extensions for files containing JSX syntax.

4. **Case sensitivity.** Vercel runs on Linux, which has a case-sensitive file system. A file imported as `./Components/Navbar` won't resolve if the actual path is `./components/Navbar`. Verify that all import paths match the exact casing of the file and directory names.

### Assets Not Loading

**Symptom:** The page loads but styles are missing or JavaScript doesn't execute. The Network tab shows 404 errors for `.js` or `.css` files.

**Solutions:**

1. **Check the `base` path** in `vite.config.js`. For Vercel root deployments, it should be `'/'` (the default).

2. **Verify the `dist/` output.** Run `npm run build` and confirm that `dist/index.html` references assets with correct paths (e.g., `/assets/index-abc123.js`).

3. **Clear the Vercel build cache** and redeploy. Stale cached assets can sometimes cause issues.

4. **Check for ad blockers or browser extensions** that might be blocking script or stylesheet loading.

---

## Other Hosting Providers

While Vercel is the recommended platform, WriteSpace can be deployed to any static hosting provider. The key requirement is configuring a fallback to `index.html` for SPA routing.

### Netlify

Create a `netlify.toml` file in the project root (or use the `public/_redirects` approach):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Alternatively, create a `public/_redirects` file:

```
/*    /index.html   200
```

### GitHub Pages

GitHub Pages does not natively support SPA routing rewrites. You can work around this with a custom `404.html` that redirects to `index.html`:

1. Set the `base` in `vite.config.js` to your repository name:

   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/writespace-blog/',
   })
   ```

2. Add a `public/404.html` file that redirects to `index.html` using a JavaScript-based redirect:

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <script>
         const path = window.location.pathname;
         window.location.replace('/writespace-blog/?redirect=' + encodeURIComponent(path));
       </script>
     </head>
   </html>
   ```

   Note: This approach has limitations and is not recommended for production use. Vercel or Netlify provide a much better experience for SPAs.