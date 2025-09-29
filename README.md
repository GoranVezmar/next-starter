# 🚧 Project Under Development

> This project is currently under active development. Expect frequent changes and improvements.

---

## 🧪 Playground, Starter Theme & Component Library

This project started as a playground for experimenting with new technologies and architectures.  
It also serves as a **starter theme** — but not just a starter theme.

The goal is to eventually turn this into a **collection of reusable, production-ready components** for modern web applications.

---

## 🧰 Tech Stack

Here’s a breakdown of the technologies used across the frontend and backend:

### Frontend

- **Next.js** – React framework for server-side rendering and routing
- **next-intl** – Internationalization (i18n) support
- **shadcn/ui** + **Tailwind CSS** – Modern, accessible UI components
- **Sonner** – Notifications system
- **TanStack Query** – Data fetching, caching, and syncing
- **TanStack Table** – Powerful table library for building feature-rich data grids (filtering, sorting, pagination, etc.)
- **TypeScript** – End-to-end type safety
- **React Hook Form** + **Zod** – Form handling and validation
- **react-three-fiber**, **drei**, **lava controls** – 3D rendering with Three.js in React

### Backend

- **Hono** – Ultra-fast web framework
- **Drizzle ORM** – Type-safe SQL query builder
- **PostgreSQL** – Relational database (Dockerized)
- **honoRPC** – Full-stack type-safe API communication
- **Zod** – Runtime schema validation
- **Better Auth** – Authentication system (email, GitHub, Google)
- **Resend** – Transactional email sending
- **GeoLite** – Geofencing and IP location
- **Winston** – Logging utility

### Tooling & Dev Experience

- **Bun** – Used as the JavaScript runtime and bundler for faster builds and scripting
- **ESLint** – Linting with custom rules (might switch ti Biome)
- **Prettier** – Code formatting with opinionated settings
- **Commitizen**, **Husky**, **Conventional Commits** – Commit message linting and Git hooks
- **Docker** – Containerized development environment

---

## ✅ Feature Checklist

Below is a list of features and tasks implemented or planned.  
Checked items are completed ✅ and unchecked ☐ are in progress or pending.

- [x] Set up conventional commits
- [x] Set up Prettier with custom rules (import order, file naming conventions, coding style preferences, etc.)
- [x] Set up PostgreSQL DB with Docker
- [x] Set up Drizzle ORM
- [x] Set up validated environment variables with Zod
- [ ] Set up geofencing with GeoLite
- [x] Set up honoRPC
- [x] Set up light and dark mode
- [x] Set up translations
- [x] Translate few pages as an example
- [x] Set up Better Auth
- [x] Create login page
- [x] Create signup page
- [x] Create roles
- [x] Add reset password functionality
- [x] Create example emails with react-email
- [x] Add signup with Gmail and GitHub
- [x] Create example of form handling with React Hook Form and Zod
- [x] Create example script for seeding the database
- [x] Set up Winston logger
- [ ] Create example of Google Maps integration
- [ ] Implement virtualization technique
- [ ] Create example for index-based pagination
- [ ] Create example for long polling
- [ ] Create example for infinite loading using Intersection Observer
- [x] Set up react-three-fiber with drei
- [x] Create a simple 3D scene with Orbit controls, Leva controls and some interactions with simple meshes
- [x] Create a simple 3D scene with vertex and fragment shaders, and some simple animations where shader uniforms are updated after user interaction
- [ ] Create a simple 3D scene with GLTF models, add user interactions to some of it's parts
- [ ] Set up payments and subscriptions with Lemon Squeezy
- [ ] Create example with tables and TanStack Table (filtering, sorting, dynamic column selection, expandable rows, etc.)
- [ ] Set up a few charts (pie, bar, radar, etc.)
- TBD

---

## 📌 Notes

This repository is constantly evolving. Contributions, ideas, and feedback are welcome as this evolves into a solid base for modern full-stack applications.

---

## 📄 License

MIT
