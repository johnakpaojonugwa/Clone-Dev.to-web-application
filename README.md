# Clone: dev.to web application

A modern, responsive blog frontend built with React and Vite. This project provides a polished UI for reading, creating, and managing posts, plus an admin area with role-based access and rich-text/markdown editors.

---

## What is it?

- **Title:** clone:dev.to
- **Description:** A Vite + React frontend for a blogging platform featuring authentication, an admin dashboard, rich-text and Markdown editors, comments, reactions, and responsive design.

---

## How do I run it? (Installation)

Prerequisites:
- Node.js 18+ and npm (or Yarn)

Steps:

1. Clone the repo

```bash
git clone https://github.com/your-username/blog-ui.git
cd blog-ui
```

2. Install dependencies

```bash
npm install
# or: yarn
```

3. Run the development server

```bash
npm run dev
# opens on http://localhost:5173 by default
```

4. Build for production

```bash
npm run build
```

5. Preview the production build locally

```bash
npm run preview
```

## How is it built? (Design and Tech Stack)

- **Framework & Bundler:** React (v19) with Vite
- **Styling:** Tailwind CSS and Ant Design for UI components
- **Routing:** react-router-dom (client-side routing with protected and role-based routes)
- **State & Context:** React Context (AppContext) for auth and global state
- **HTTP / API:** axios with API adapters in `src/api/`
- **Editors:** TipTap and a Markdown editor for rich-text and Markdown support
- **Linting & Tooling:** ESLint, Prettier, Vite dev server
- **Project Structure (high level):**
   - `src/` — application source
   - `src/components/` — UI components
   - `src/pages/` — route pages (home, post, admin, auth)
   - `src/api/` — API adapters and fetch utilities
   - `src/context/` — application context providers

---

## What does it do? (Features)

- Public feed: browse post previews and read single posts
- Post creation: create posts using a rich-text and/or Markdown editor
- Admin dashboard: manage posts, users, and site settings
- Authentication: login/register flows and protected routes
- Role-based access: UI/route restrictions for admin vs author vs guest
- Comments & reactions: leave comments and react to posts
- Markdown rendering and syntax highlighting for code blocks
- Responsive UI: mobile-first layout and accessible components
- Reusable components: PostCard, PostList, Editor, Sidebars, etc.

---

## Where to look in the code

- Entry point: [src/main.jsx](src/main.jsx)
- Routing: [src/router/ProtectedRoute.jsx](src/router/ProtectedRoute.jsx) and [src/router/RoleRoute.jsx](src/router/RoleRoute.jsx)
- API adapters: [src/api/posts.api.js](src/api/posts.api.js)
- Main components: [src/components](src/components)

---

## Contributing

Contributions are welcome. Open an issue to discuss changes, then submit a pull request with a clear description of the change and any setup steps.

---

## License

There is none as of now but will be sorted out soon
