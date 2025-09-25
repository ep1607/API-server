const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const contactPage  = require("./routes/contact");
const { router: indexPage, pages } = require("./routes/page");

// parse JSON bodies
const app = express();
app.use(express.json());

// Load Swagger YAML
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/contact", contactPage);      // For contact.js endpoint
app.use("/", indexPage);               // For page.js endpoints
// Serve static HTML file for client
app.use(express.static("public"));
// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});
// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`📄 Contacts at http://localhost:${PORT}/contact`);
});

module.exports = app;
