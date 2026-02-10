# 🍬 Sweet Shop Management System

A **full-stack Sweet Shop Management System** built as part of the **AI Kata – TDD Assessment**.

This project demonstrates **backend API design, authentication & authorization, database persistence, role-based access control, frontend UI development, testing, deployment, and responsible AI usage**.

---

# 🔗 Live Application

### Frontend (Vercel)
https://ai-kata-sweet-shop-b04t1xds3-anshikagoel3s-projects.vercel.app

### Backend (Render)
https://ai-kata-sweet-shop.onrender.com

---

# 🧩 Project Structure

```
.
├── backend/        # Spring Boot REST API (PostgreSQL + JWT)
├── frontend/       # React (Vite) + Material UI
└── README.md
```

---

# Key Features

## Authentication & Authorization
- JWT-based login & signup
- Role-based access control (ADMIN / USER)
- Protected endpoints using Spring Security

## Admin Capabilities
- Add sweets
- Update inventory
- Delete sweets
- Manage stock

## User Capabilities
- View sweets catalog
- Search & filter sweets
- Purchase sweets

---

# Application Screenshots

### Login Screen
![Login](./login.png.png)

### User Dashboard
![User Dashboard](./dashboard-user.png.png)

### Admin Dashboard
![Admin Dashboard](./dashboard-admin.png.png)

### Add / Edit Sweet
![Add Sweet](./admin-add-sweet.png.png)

---

# 🤖 AI Usage Declaration

## AI Tools Used
- ChatGPT – Backend architecture, security configuration, debugging
- Google Gemini – Frontend UI improvements and deployment support

## How AI Was Used

### Backend Development
- Generated Spring Boot boilerplate
- Assisted with JWT authentication flow
- Business logic implemented and validated manually

### Frontend Development
- Assisted in building React components using Material UI
- API integration via Axios

### Deployment & Debugging
- Helped resolve CORS and environment variable issues
- Assisted deployment to Vercel and Render

All AI-generated suggestions were reviewed and verified.

---

# 🛠️ Tech Stack

## Backend
- Java 17
- Spring Boot 3
- PostgreSQL (Render DB)
- Spring Security + JWT
- Maven

## Frontend
- React (Vite)
- Material UI
- Axios

---

# Testing Strategy

## Backend
- Core business logic implemented using **TDD principles**

## Frontend
- UI validation for stock availability

---

# Running Locally

## Backend

```bash
cd backend
mvn spring-boot:run
```

Runs at:

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

# Author

**Anshika Goel**
