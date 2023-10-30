import { afterEach, beforeEach } from "node:test";
import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("DELETE /cache", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should delete cache", async () => {
    const res = await app.inject({
      url: "/cache",
      method: "DELETE",
    });

    const response = res.json();

    expect(response).toEqual({
      success: true,
    });
  });
});
