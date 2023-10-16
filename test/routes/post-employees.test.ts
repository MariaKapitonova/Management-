import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("POST /api/employees", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should post employee", async () => {
    const res = await app.inject({
      url: "/api/employees",
      method: "POST",
      body:{
        name: "Aaaaaaaaa",
        title: "Intern",
        tribe_id: 1
      },
    });

    const response = res.json();
    expect(response).toEqual({
        success: true
      });
  });
});