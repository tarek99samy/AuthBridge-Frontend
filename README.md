# AuthBridge‑Frontend

A **secure, modern authentication frontend** built with **React**,
**React Query**, **Axios**, **Tailwind CSS**, and **shadcn‑ui
components**.\
This project is part of the **AuthBridge full‑stack task** and
demonstrates professional authentication handling including:

- Login & Signup
- Protected routes
- Logout
- Session management with HttpOnly cookies
- CSRF protection
- Error‑aware global handling
- Clean architecture & scalable state management

👉 Backend counterpart: _AuthBridge‑Backend_ (NestJS + MongoDB with
secure JWT & CSRF protection)

---

## 🚀 Key Features

### 🔐 Authentication

- Login & Signup with form validation
- Protected routes (only authorized users can access)
- Logout clears session securely

### 🛡️ Security First

- HttpOnly cookies for access tokens (XSS‑resistant)
- CSRF protection using double submit token pattern
- Automatic token handling via Axios interceptors
- React‑Query for reliable API state and error management

### ⚡ Performance & UX

- Built with Vite + React (TypeScript) for blazing fast builds
- React Query for smart data caching + background syncing
- Clean UI using Tailwind CSS + shadcn components
- Route protection & auto redirects

### 🧩 Architecture Highlights

- Clear separation of React state (AuthContext) and server state
  (React Query)
- Axios with credentials and CSRF header injection
- Global error boundary and loading states
- Ready for testing & CI/CD

---

## 📦 Tech Stack

Layer Technology

---

Frontend React + TypeScript
Routing React Router v6
Server State React Query
HTTP Axios
Styling Tailwind CSS
UI Components shadcn/ui
Auth JWT (HttpOnly Cookie) + CSRF
Build Tool Vite

---

## 📥 Getting Started

### Clone the Repository

```bash
git clone https://github.com/tarek99samy/AuthBridge-Frontend.git
cd AuthBridge-Frontend
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` for development API URL:

```env
VITE_API_URL=https://api.yourdomain.com
```

or `.env.production` for production API URL:

```env
VITE_API_URL=http://YOU_HOSTED_API_URL
```

### Run the App

```bash
npm run dev
```

The app will be available at:

    http://localhost:5173

### Run the Tests

```bash
npm run test
```

---

## 📁 Project Structure

    src/
    ├── api/            # API call functions
    ├── components/     # reusable UI components
    ├── pages/          # page components
    ├── hooks/          # custom hooks
    ├── lib/            # utility functions
    ├── store/          # global state management
    ├── types/          # type definitions
    ├── App.tsx         # application entry point
    └── main.tsx

---

## 🧪 Best Practices Implemented

- Secure cookie‑based authentication
- CSRF protection
- React Query caching
- Clean separation of concerns
- Scalable folder structure
