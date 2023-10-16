import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("GET /api/tribes/:id", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should return tribe by id", async () => {
    const res = await app.inject({
      url: "/api/tribes/1",
      method: "GET",
    });

    const response = res.json();

    expect(response).toEqual({
        id: 1,
        name: "Internstellar",
        department: "Other Engineering"
    });
  });

  it("should return 404 when no tribe found", async () => {
    const res = await app.inject({
      url: "/api/tribes/420",
      method: "GET",
    });

    const response = res.json();
    const statusCode = res.statusCode;

    expect(statusCode).toEqual(404);
    expect(response).toEqual({
      error: "No tribes with id 420 is found",
    });
  });

  it("should return validation error when id is not number", async () => {
    const res = await app.inject({
      url: "/api/tribes/punk",
      method: "GET",
    });

    const response = res.json();
    const statusCode = res.statusCode;
    console.log(response);

    expect(statusCode).toEqual(400);
    expect(response).toEqual(
      expect.objectContaining({
        message: "params/id must be integer",
      })
    );
  });
});