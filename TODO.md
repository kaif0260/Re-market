# Project TODO - Orders / Roles

## Step 1
- [x] Gather context: backend order model, seller/admin controllers, existing frontend order pages.

## Step 2
- [x] Implement seller-side order status update UI (Pending→Confirmed→Shipped→Delivered, Cancelled).
- [x] Wire UI to `PUT /api/seller/orders/:id/status`.

## Step 3
- [x] Fix seller controller: make pagination count consistent with filtered seller items (count based on filtered items/orders).


## Step 4
- [ ] Ensure admin page status dropdown aligns with desired behavior.

## Step 5
- [ ] Run sanity checks: start backend + frontend, validate flows manually.

