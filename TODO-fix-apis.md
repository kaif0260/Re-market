# Fix API & Server Errors (404/vite.svg + :5000 Connection Refused)

## Steps:
- [ ] 1. Ensure MongoDB running (mongod on localhost:27017)
[x] 2. Backend: cd backend && npm install && npm run dev  (port 5000)\n- [x] 3. Frontend: cd frontend && npm install && npm run dev (port 3000 + proxy) → running on 3001
- [ ] 4. Test: http://localhost:3000 (check Network tab no 5000 errors), http://localhost:5000/api/health
- [ ] 5. Login test admin: admin@remarket.com / admin123

Note: Vite.svg 404 resolved by Vite dev server.

