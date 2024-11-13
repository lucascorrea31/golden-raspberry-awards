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

	// Este teste depende exclusivamente da massa de dados disponibilizada.
	// Ao alterar os dados, estes testes tendem a falhar.
	it("should return a producer with a min interval equals 1", async () => {
		const response = await request(app).get("/awards/producers/intervals");
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("min");
		expect(response.body.min.length).toEqual(1);
		expect(response.body.min[0]).toHaveProperty("interval");
		expect(response.body.min[0].interval).toEqual(1);
	});

	// Este teste depende exclusivamente da massa de dados disponibilizada.
	// Ao alterar os dados, estes testes tendem a falhar.
	it("should return a producer with a max interval equals 13", async () => {
		const response = await request(app).get("/awards/producers/intervals");
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("max");
		expect(response.body.max.length).toEqual(1);
		expect(response.body.max[0]).toHaveProperty("interval");
		expect(response.body.max[0].interval).toEqual(13);
	});
});
