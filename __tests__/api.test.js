// __tests__/api.test.js
const request = require("supertest");
const app = require("../server"); // import your Express app
const server = app.listen();
const jestOpenAPI = require("jest-openapi").default || require("jest-openapi");
const path = require("path");
jestOpenAPI(path.join(__dirname, "../swagger.yaml"));


/*const request = require("supertest");
const app = require("../server"); // import your Express app
const jestOpenAPI = require("jest-openapi").default || require("jest-openapi");
jestOpenAPI("swagger.yaml");*/

 describe("API Contract Tests", () => {
	it("GET /pages should match the OpenAPI spec", async () => {
		const res = await request(app).get("/pages");
		expect(res).toSatisfyApiSpec();
	});

	it("POST /pages should match the OpenAPI spec", async () => {
			const res = await request(app)
			.post("/pages")
			.send({ title: "Test Page", content: "This is a test." });
			expect(res).toSatisfyApiSpec();
	});

		it("DELETE /pages/:id should match the OpenAPI spec", async () => {
			const res = await request(app)
			.delete("/pages/2")
			expect(res).toSatisfyApiSpec();
	});

	it("PUT /pages should match the OpenAPI spec", async () => {
			const res = await request(app)
			.put("/pages/1")
			.send({ title: "Test Page for Put", content: "This is a test for Put." });
			expect(res).toSatisfyApiSpec();
	});

	it("GET /contact should match the OpenAPI spec", async () => {
		const res = await request(app).get("/contact");
		expect(res).toSatisfyApiSpec();
	});
});
