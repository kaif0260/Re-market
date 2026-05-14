# Fix Login/API Errors - Server Start Plan (Approved)

## Current Status
- ✅ Backend config correct (port 5000, CORS for 3001)
- ✅ Frontend proxy correct (/api → localhost:5000)
- ❌ Backend not running (ERR_CONNECTION_REFUSED)
- Test login: `admin@remarket.com` / `admin123`

## Steps to Complete

### 1. [ ] Start MongoDB
```
# Install MongoDB if missing: https://www.mongodb.com/try/download/community
mongod  # or via service: net start MongoDB
```

### 2. [ ] Backend (cd backend && npm i && npm run dev)
```
cd backend
npm install
npm run dev
```
Expected: `Server running on http://localhost:5000` + `MongoDB Connected`

### 3. [ ] Frontend (new terminal: cd frontend && npm i && npm run dev)
```
cd frontend
npm install
npm run dev
```
Expected: `Local: http://localhost:3001/` (Vite auto-port)

### 4. [ ] Test
- Open `http://localhost:3001`
- Network tab: No 5000 refused errors
- Backend health: `http://localhost:5000/api/health`
- Login: `admin@remarket.com` / `admin123`

### 5. [ ] Troubleshooting
- Port 5000 busy: `netstat -ano | findstr :5000` → kill PID
- MongoDB error: Install/start service
- Proxy fail: Check vite.config.js target:5000

**Progress: Ready to execute steps 1-5**
