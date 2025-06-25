# 🌟 Volunteer Management Website

A full-stack volunteer management platform that enables users to create, manage, and participate in volunteer opportunities.

---

## 📌 Project Overview

This application allows individuals or organizations to:
- Post volunteer needs
- Update or delete their posts
- Sign up to be a volunteer for others' posts

Includes protected routes, JWT authentication, and a responsive UI built with React and Tailwind CSS.

---

## 🔗 Live Website

👉 [Live Demo](https://volunteer-management-6c338.web.app/)

---

## 🎯 Key Features

### 👥 Authentication
- Email & Password login/register
- Social login (Google or GitHub)
- JWT token-based route protection

### 📝 Volunteer Posts
- Add/Edit/Delete volunteer requests
- View post details (protected)
- Become a volunteer for posted opportunities

### 🏠 Home Page
- Eye-catching banner/slider with 3+ slides
- "Volunteer Needs Now" section (sorted by deadline)
- 2 additional meaningful sections
- Framer Motion animation

### 📋 Manage Posts
- My Volunteer Posts (table format with edit/delete)
- My Volunteer Requests (with cancel option)
- Search functionality by title
- Change layout (card ↔ table)

### 🌗 UI/UX Enhancements
- Responsive on all devices
- Dark/Light mode toggle
- Dynamic page titles
- Custom 404 page
- Loading spinners
- Toast/SweetAlert notifications

---

## 🔐 Security & Deployment

- Firebase config secured with `.env`
- MongoDB URI hidden using environment variables
- JWT token handling for protected API access
- Deployed:
  - Client: Firebase / Netlify
  - Server: Vercel

---

## 🧰 Tech Stack

### 🔹 Client
- React
- Tailwind CSS
- React Router DOM
- React Hook Form
- React Toastify / SweetAlert
- React Datepicker
- Framer Motion
- JWT Decode

### 🔸 Server
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Dotenv
- CORS

---

## 📦 NPM Packages Used

```bash
npm install react-router-dom axios react-hook-form framer-motion react-toastify react-datepicker jwt-decode dotenv cors express mongoose jsonwebtoken
