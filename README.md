# Menu Management Backend

## Overview
Node.js + Express backend for managing Categories → SubCategories → Items with CRUD and search functionality.

## Requirements
- Node.js
- Express
- MongoDB

## Setup
1. Clone repo
2. `cd menu-management-backend`
3. `npm install`
4. Copy `.env.example` to `.env` and set `MONGO_URI`
5. Start server:
   - Development: `npm run dev`
   - Production: `npm start`

Server runs at `http://localhost:5000` by default.

## API Endpoints
### Categories
- POST `/api/categories`  
  body: `{ name, image, description, taxApplicability, tax, taxType }`
- GET `/api/categories`
- GET `/api/categories/:idOrName`
- PUT `/api/categories/:id`

### SubCategories
- POST `/api/subcategories`  
  body: `{ name, image, description, categoryId, taxApplicability, tax, taxType }`
- GET `/api/subcategories`
- GET `/api/subcategories/category/:categoryId`
- GET `/api/subcategories/:idOrName`
- PUT `/api/subcategories/:id`

### Items
- POST `/api/items`  
  body: `{ name, image, description, categoryId, subCategoryId, taxApplicability, tax, taxType, baseAmount, discount }`
  - `totalAmount` computed as `baseAmount - discount` automatically.
- GET `/api/items`
- GET `/api/items/category/:categoryId`
- GET `/api/items/subcategory/:subCategoryId`
- GET `/api/items/:idOrName`
- PUT `/api/items/:id`
- GET `/api/items/search?name=coffee` — search by name (case-insensitive)

## Notes
- Inline comments provided in code for clarity.
- Recommend using Postman to create a collection named `Menu Management APIs`.

