# How to Run Re-Market Project

## Prerequisites

- **Node.js** (v18 or higher) – [Download](https://nodejs.org/)
- **MongoDB** running on your machine (you already use MongoDB Compass on `localhost:27017`)

---

## Step 1: Start MongoDB

Make sure MongoDB is running:

- If you use **MongoDB Compass**, the connection `localhost:27017` means the MongoDB service is running.
- If not: start the MongoDB service (e.g. from Services on Windows, or run `mongod` in a terminal).

The project will create the **remarket** database automatically when you use the app.

---

## Step 2: Run the Backend

Open a terminal in the project folder (e.g. `Re-market`).

```bash
cd backend
npm install
npm run dev
```

You should see:

- `✅ MongoDB Connected`
- `🚀 Server running on port 5000`

Backend API: **http://localhost:5000**

---

## Step 3: Run the Frontend

Open a **second** terminal in the project folder.

```bash
cd frontend
npm install
npm run dev
```

You should see something like:

- `Local: http://localhost:3000/`

---

## Step 4: Open the App

In your browser go to: **http://localhost:3000**

- Browse **Products** and **Resale**
- **Register** → verify with OTP (if email is set) or test with the API
- **Login** → use Cart, Checkout, Orders, Profile
- **Resale** → sell items (after you have a delivered order)

---

## Quick Reference

| Part      | Folder    | Command       | URL                  |
|----------|-----------|---------------|----------------------|
| Backend  | `backend` | `npm run dev` | http://localhost:5000 |
| Frontend | `frontend`| `npm run dev` | http://localhost:3000 |

---

## If Something Fails

- **MongoDB connection error**  
  Check that MongoDB is running and that `backend/env.local` has:
  ```env
  MONGODB_URI=mongodb://localhost:27017/remarket
  ```

- **Port already in use**  
  Change `PORT` in `backend/env.local` (e.g. `5001`) or close the app using that port.

- **Frontend can’t reach API**  
  Keep the backend running on port 5000. The frontend is set to proxy `/api` to `http://localhost:5000`.
