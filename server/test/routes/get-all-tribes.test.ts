import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("GET /api/tribes", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should return all tribes", async () => {
    const res = await app.inject({
      url: "/api/tribes",
      method: "GET",
    });

    const response = res.json();
    expect(response).toHaveLength(3);
  });

  it("should return correct tribe", async () => {
    const res = await app.inject({
      url: "/api/tribes",
      method: "GET",
    });

    const response = res.json();

    expect(response[0]).toEqual({
      id: 1,
      name: "Internstellar",
      department: "Other Engineering",
    });
  });
});
