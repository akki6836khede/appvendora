# Vendora

Vendora is a role-based local commerce and delivery platform built using Next.js, React, MongoDB, Tailwind CSS, and Razorpay.

The platform connects local shopkeepers with local customers through local delivery partners, making the ecosystem more independent and supportive for local businesses and customers.

Vendora helps local shop owners digitally manage and sell their products while enabling customers to order nearby products quickly with delivery support.

---

# Application Flow

Vendora works with three different roles:

* Customer
* Shopkeeper
* Delivery Partner

Each role has different access and functionality inside the application.

---

# Customer Features

* Browse products from nearby shops
* Add products to cart
* Place orders
* Choose payment method:

  * Online Payment
  * Cash on Delivery
* Track order status

---

# Shopkeeper Features

* Add products
* Update products
* Delete products
* Manage inventory
* View customer orders
* Manage product availability

---

# Delivery Partner Features

* View delivery orders in local areas
* Accept delivery orders
* Deliver products to customers
* Update delivery status
* Handle Cash on Delivery settlements

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

## Styling

* Tailwind CSS

## State Management & Data Fetching

* useSWR

## Payment Gateway

* Razorpay

---

# Project Structure

```bash id="t8qp1x"
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

