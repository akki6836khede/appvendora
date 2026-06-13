# Vendora (E-commerce Platform)

Vendora is a full-stack role-based e-commerce and local delivery platform built using Next.js, React, MongoDB, Tailwind CSS, and Razorpay.

The platform connects local shopkeepers with local customers through local delivery partners, creating an independent ecosystem for local businesses and nearby customers.

Vendora helps local shop owners digitally manage and sell their products while enabling customers to order products from nearby shops with fast local delivery support.

---

# Core Features

* Role-Based Access Control
* Google Authentication using NextAuth
* Razorpay Payment Integration
* Online Payment & Cash on Delivery
* Local Delivery Management
* Fully Responsive UI
* Server Actions Based Backend
* Dynamic Data Fetching using useSWR

---

# User Roles

## Customer

* Browse products from nearby shops
* Add products to cart
* Place orders
* Choose payment method:

  * Online Payment
  * Cash on Delivery
* Track order status

---

## Shopkeeper

* Add products
* Update products
* Delete products
* Manage inventory
* View customer orders
* Manage product availability

---

## Delivery Partner

* View delivery orders in local areas
* Accept delivery orders
* Deliver products to customers
* Update delivery status
* Handle Cash on Delivery settlements

---

# Authentication

Authentication is implemented using:

* NextAuth
* Google OAuth

Secure login and role-based access are managed through NextAuth authentication flow.

---

# Payment System

Razorpay is integrated for:

* Online customer payments
* COD settlement handling for delivery partners

Both online payment and Cash on Delivery options are available.

---

# Tech Stack

## Frontend

* Next.js
* React.js
* JavaScript

## Backend

* Next.js Server Actions

> The project does not use traditional REST APIs.
> Backend operations are handled using Next.js Server Actions.

## Database

* MongoDB

## Authentication

* NextAuth
* Google OAuth

## Styling

* Tailwind CSS

## State Management & Data Fetching

* useSWR

## Payment Gateway

* Razorpay

---

# Project Structure

```bash id="0p4z2r"
Vendora
│
├── .next/
├── actions/
├── app/
├── components/
├── lib/
├── models/
├── node_modules/
├── public/
│
├── .env.local
├── .gitignore
├── eslint.config.js
├── jsconfig.json
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
└── README.md
```

---

# Architecture Overview

## Frontend Layer

Built using Next.js and React for creating responsive and interactive user interfaces.

## Backend Layer

Server-side logic is handled using Next.js Server Actions instead of REST APIs.

## Database Layer

MongoDB is used for storing:

* User data
* Product information
* Orders
* Delivery details
* Payment-related data

## Authentication Layer

NextAuth with Google OAuth is used for secure authentication and role-based access control.

## Payment Layer

Razorpay handles:

* Online payments
* COD settlements

## State Management

useSWR is used for:

* Data fetching
* Client-side caching
* Dynamic UI updates

---

# Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Desktop Screens

Tailwind CSS is used for styling and responsiveness.
