# Allo Inventory Reservation System

## Live URL

https://allo-inventory-git-main-allo-inventory-s-projects.vercel.app

## GitHub Repository

https://github.com/somasundaram-analytics/allo-inventory

---

## Tech Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL (Neon)
- Vercel

---

## Features

- Product inventory management
- Warehouse management
- Reservation system
- Reservation confirmation
- Reservation release
- Prevent over-reservation
- Live stock updates
- Reservation countdown page

---

## API Endpoints

### Get Products

GET /api/products

### Get Warehouses

GET /api/warehouses

### Create Reservation

POST /api/reserve

### Confirm Reservation

POST /api/reserve/:id/confirm

### Release Reservation

POST /api/reserve/:id/release

---

## Frontend

- Product listing page
- Reserve button
- Reservation page
- Confirm Purchase button
- Cancel button
- Countdown timer
- Live UI updates

---

## Running Locally

```bash
npm install
npm run dev