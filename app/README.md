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
- Multi-warehouse stock handling
- Reservation system
- Reservation confirmation
- Reservation release
- Prevent over-reservation
- Live stock updates

---

## API Endpoints

### Get Products

GET /api/products

### Create Reservation

POST /api/reserve

### Confirm Reservation

POST /api/reserve/:id/confirm

### Release Reservation

POST /api/reserve/:id/release

---

## Running Locally

```bash
npm install
npm run dev