# 🏢 Urban Nest – Building Management System

A modern full-stack **Building Management System (BMS)** for managing residential apartments, agreements, rent payments, user roles, and admin features. Designed with a mobile-first UI, Firebase authentication, and secure role-based dashboards.

Live Demo: [🌐 Urban Nest on Netlify](https://ubiquitous-gingersnap-59b4fd.netlify.app/)

---

## ✨ Features

### 🔐 Authentication & Authorization
- Firebase email/password and Google sign-in
- Token-based route protection with role-based access (`user`, `member`, `admin`)
- Persistent login via `localStorage` and context API

### 🧭 Navigation & Layouts
- Responsive public layout with Home, Apartment, Login, Register, and 404
- Dashboard layouts for:
  - **Users**: Profile, Agreement
  - **Members**: Profile, Payment
  - **Admins**: Overview, Manage Members, Coupons, Announcements

### 🏠 Apartment Management
- View available apartments with rent range filter
- One-click agreement request per user
- Agreement request system with accept/reject by admin

### 💳 Stripe Payment Integration
- Rent payment with Stripe checkout
- Dynamic rent calculation with coupon discount
- Payment success page with transaction details
- Viewable payment history for members

### 🧾 Coupon System
- Admin can create, enable/disable coupons
- Members can apply valid coupons during payment
- Real-time feedback with toast alerts

### 📢 Announcements
- Admin can make announcements via secure dialog form
- Members and users can view announcements with loading and empty states

### 🛎️ Notice System
- Member rent notice tracking
- Admin can view, process and downgrade members with repeated notices

### 🗺️ Building Map & Footer
- Interactive building map using **React Leaflet**
- Redesigned footer with contact info, branding, and social icons

## 📸 Screens Overview

### 🏠 Home Page
- Highlights the platform’s purpose with a modern banner and CTA
- Includes apartment previews and feature highlights
- Fully responsive with animated elements

### 👤 Member Dashboard
- Shows member profile with apartment details and rent summary
- Includes a secure Stripe-integrated payment flow
- Displays rent history and notice status with responsive cards

### 🛠️ Admin Coupons Page
- Allows admins to create, enable, and disable coupon codes
- Provides real-time form with validation using Dialog from ShadCN UI
- Displays all coupons in a clean, responsive data table with actions


## 🛠 Tech Stack

### 🧩 Frontend
- **React 19 + Vite**
- **Tailwind CSS v3.4.1**
- **Framer Motion** – Page & component animations
- **Lucide Icons** – Icon set
- **ShadCN/UI** – Dialogs, buttons, sheets, cards
- **React Query** – Data fetching and caching
- **React Hook Form** – Forms and validation
- **React Leaflet** – Building map
- **Stripe.js & React Stripe** – Payment integration

### 🔐 Auth & Backend Integration
- **Firebase Authentication**
- **Axios** with interceptor for token injection
- **Custom Express.js API** – CRUD, protected endpoints
- **MongoDB** – Database for apartments, agreements, payments, and coupons

---

