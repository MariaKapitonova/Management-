import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("GET /api/reports/employees", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should return all reports", async () => {
    const res = await app.inject({
      url: "/api/reports/employees",
      method: "GET",
    });

    const response = res.json();
    expect(response).toHaveLength(3);
  });

  it("should return correct reports structure", async () => {
    const res = await app.inject({
      url: "api/reports/employees",
      method: "GET",
    });

    const response = res.json();

    expect(response[0]).toEqual({
        tribe_name: "Internstellar",
        employees: [
            {
                id: 1,
                name: "Cooper",
                title: "Software Engineer",
                tribe_id: 1
            },
            {
                id: 2,
                name: "Murph",
                title: "Software Engineer",
                tribe_id: 1
            },
            {
                id: 3,
                name: "TARS",
                title: "Designer",
                tribe_id: 1
            },
        ],
    });
  });
});