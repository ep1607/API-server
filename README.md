# API Server

This project is a simple Node.js and Express API server with a web frontend. It demonstrates CRUD operations for a "Page" resource, complete with Swagger documentation and a static website for interacting with the API.

## Features
- RESTful CRUD API for pages (`/pages`)
- Swagger UI documentation (`/api-docs`)
- Static frontend to view and manage pages
- Example endpoints for contacts

## How to Use

### 1. Install dependencies
```
npm install
```

### 2. Start the server
```
npm start
```
Or, if not configured:
```
node server.js
```

### 3. Open in your browser
- API docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Web frontend: [http://localhost:3000/](http://localhost:3000/)

### 4. API Endpoints
- `GET /pages` — List all pages
- `POST /pages` — Create a new page (JSON body: `{ "title": "...", "content": "..." }`)
- `GET /pages/:id` — Get a page by ID
- `PUT /pages/:id` — Update a page by ID
- `DELETE /pages/:id` — Delete a page by ID
- `GET /contact` — Contact page endpoint

### 5. Frontend Usage
- View all pages
- Add, update, or delete pages using the buttons
- Click a page to view its details

## Development
- Edit routes in `routes/page.js` and `routes/contact.js`
- Static files are in the `public/` folder
- API documentation is in `swagger.yaml`

---
© 2025 evelink
