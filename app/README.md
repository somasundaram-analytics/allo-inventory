# Allo Inventory Reservation System

## Tech Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS

---

## Features

- Product listing
- Inventory management
- Reservation system
- Confirm reservation
- Release reservation
- Concurrency-safe reservation logic
- Live stock updates

---

## API Endpoints

### Get Products

GET /api/products

---

### Create Reservation

POST /api/reserve

Example Body:

```json
{
  "productId": "...",
  "warehouseId": "...",
  "quantity": 1
}
```

---

### Confirm Reservation

POST /api/reserve/:id/confirm

---

### Release Reservation

POST /api/reserve/:id/release

---

## Run Project

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run dev
```

---

## Database

PostgreSQL with Prisma ORM.

---

## Concurrency Handling

Used PostgreSQL row locking with:

```sql
FOR UPDATE
```

inside Prisma transaction to prevent double reservation.