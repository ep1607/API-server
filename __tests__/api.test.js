// __tests__/api.test.js
const request = require("supertest");
const app = require("../server"); // import your Express app
const server = app.listen();
const { router, pages } = require("../routes/page");
const jestOpenAPI = require("jest-openapi").default || require("jest-openapi");
const path = require("path");
const { deserialize } = require("v8");
jestOpenAPI(path.join(__dirname, "../swagger.yaml"));


 describe("API Contract Tests", () => {
	
	describe("GET /pages should match the OpenAPI spec", () => {

		it("GET /pages 200", async () => {
			const res = await request(app).get("/pages");
			expect(res).toSatisfyApiSpec();
		});

		it("GET /pages 404", async () => {
			const backup = [...pages]; // Backup current pages
			pages.length = 0; // Clear pages to simulate no pages
			const res = await request(app).get("/pages");
			expect(res).toSatisfyApiSpec();
			pages.push(...backup); // Restore pages
		});
	});

	describe("POST /pages should match the OpenAPI spec", () => {
		it("POST /pages 201", async () => {
				const res = await request(app)
				.post("/pages")
				.send({ title: "Test Page", content: "This is a test." });
				expect(res).toSatisfyApiSpec();
		});

		it("POST /pages 400 - missing fields", async () => {
				const res = await request(app)
				.post("/pages")
				.send({ title: "Incomplete Page" }); // Missing content
				expect(res).toSatisfyApiSpec();
		});
		
		it("POST /pages 400 - extra fields", async () => {
				const res = await request(app)
				.post("/pages")
				.send({ title: "Extra Field Page", content: "This has an extra field.", extra: "Not allowed" });
				expect(res).toSatisfyApiSpec();
		});

		it("POST /pages 400 - wrong data types", async () => {
				const res = await request(app)
				.post("/pages")
				.send({ title: 123, content: true }); // title should be string, content should be string
				expect(res).toSatisfyApiSpec();
		});

	});

	describe("GET /pages/:id should match the OpenAPI spec", () => {
		it("GET /pages/:id 200", async () => {
			const res = await request(app).get("/pages/1");
			expect(res).toSatisfyApiSpec();
		});
		
		it("GET /pages/:id 404", async () => {	
			const res = await request(app).get("/pages/9999"); // Assuming this ID doesn't exist
			expect(res).toSatisfyApiSpec();
		});

	});

	describe("DELETE /pages/:id should match the OpenAPI spec", () => {
		
		it("DELETE /pages/:id 200", async () => {
			// Create a page to delete
			const createRes = await request(app)
				.post("/pages")
				.send({ title: "Page to Delete", content: "This page will be deleted." });
			const pageId = createRes.body.id;

			// Delete the page
			const res = await request(app).delete(`/pages/${pageId}`);
			expect(res).toSatisfyApiSpec();
		});

		it("DELETE /pages/:id 404", async () => {
			const res = await request(app)
			.delete("/pages/9999") // Assuming this ID doesn't exist
			expect(res).toSatisfyApiSpec();
		});
	});

	describe("PUT /pages/:id should match the OpenAPI spec", () => {
		it("PUT /pages/:id 200", async () => {
				const res = await request(app)
				.put("/pages/1")
				.send({ title: "Updated Title", content: "Updated content." });
				expect(res).toSatisfyApiSpec();
		});
		
		it("PUT /pages/:id 404", async () => {
				const res = await request(app)
				.put("/pages/9999") // Assuming this ID doesn't exist
				.send({ title: "Non-existent Page", content: "This page does not exist." });
				expect(res).toSatisfyApiSpec();
		});
	});

	describe("GET /contact should match the OpenAPI spec", () => {
		it("GET /contact 200", async () => {
			const res = await request(app).get("/contact");
			expect(res).toSatisfyApiSpec();
		});
	});

	describe("Undefined routes should return 404 and match the OpenAPI spec", () => {
		it("GET /x-undefined-routes 404", async () => {
			const res = await request(app).get("/this-route-does-not-exist");
			expect(res).toSatisfyApiSpec();
		});
	});

	describe("Global error handler should return 500 and match the OpenAPI spec", () => {
		it("GET /error 500", async () => {
			// Temporarily add a route that throws an error
			app.get("/error", (req, res) => {
				throw new Error("Test error");
			});
			const res = await request(app).get("/error");
			expect(res).toSatisfyApiSpec();
		});
	});

});

afterAll(() => { 
	server.close();
});