const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const contactPage = require("./routes/contact");
const indexPage = require("./routes/page");

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`📄 Contacts at http://localhost:${PORT}/contact`);
});;
