const express = require("express");
const router = express.Router();
const path = require("path");

let pages = [
    { id: 1, title: "Home", content: "Welcome to my API learning page!" },
    { id: 2, title: "About", content: "This is the about page." },
]; // In-memory store

// Create a page
router.post("/pages", (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  if (typeof req.body.title !== 'string' || typeof req.body.content !== 'string') {
    return res.status(400).json({ error: "Title and content must be strings" });
  }

  const { title, content } = req.body;

  // Reject if extra fields exist
  const allowedFields = ["title", "content"];
  const extraFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (extraFields.length > 0) {
    return res.status(400).json({
      error: `Extra fields not allowed: ${extraFields.join(", ")}`
    });
  }

  const page = {
    id : pages.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  pages.push(page);
  res.status(201).json(page);
});

// Read all pages
router.get("/pages", (req, res) => {
  res.json(pages);
});

// Read one page by id
router.get("/pages/:id", (req, res) => {
  // find page by id: searches the pages array for a page with the matching id (p is each page in the array) 
  const page = pages.find(p => p.id === parseInt(req.params.id));
  if (!page) return res.status(404).json({ error: "Page not found" });
  if (req.headers.accept && req.headers.accept.includes("application/json")) return res.json(page);
  res.sendFile(path.join(__dirname, "../public/page.html"));
  
});

// Update a page by id
router.put("/pages/:id", (req, res) => {
  const index = pages.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Page not found" });
  pages[index] = { ...pages[index], ...req.body };
  res.json(pages[index]);
});

// Delete a page by id
router.delete("/pages/:id", (req, res) => {
  const index = pages.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Page not found" });
  const deleted = pages.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;