import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";
import { SearchParamsSchema, SearchParamsType } from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees",
    schema: {
      querystring: SearchParamsSchema,
    },
    handler: async (request, reply) => {
      const searchQuery = request.query as SearchParamsType;

      try {
        const employees = await employeesModel.getEmployees(
          fastify,
          searchQuery
        );
        reply.code(200).send(employees);
      } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
      }
    },
  };
}
