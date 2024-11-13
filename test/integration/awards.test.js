const request = require("supertest");
const app = require("../../src/app");

let server;

beforeAll((done) => {
	server = app.listen(3000, () => {
		console.log("Test server running on port 3000");
		done();
	});
});

afterAll((done) => {
	server.close(() => {
		console.log("Test server closed");
		done();
	});
});

describe("GET /awards/producers/intervals", () => {
	it("should return producers with min and max award intervals", async () => {
		const response = await request(app).get("/awards/producers/intervals");
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("min");
		expect(response.body).toHaveProperty("max");
	});
});
