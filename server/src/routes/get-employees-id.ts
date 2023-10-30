import { FastifyInstance, RouteOptions } from "fastify";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import * as employeesModel from "../models/employees.model";
import { IdParamsSchema, IdParamsType } from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees/:id",
    schema: {
      params: IdParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;

      try {
        const employee = await employeesModel.getEmployee(fastify, params.id);
        reply.code(200).send(employee);
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          reply.code(404).send({ error: error.message });
        } else {
          reply.code(500).send({ error: (error as Error).message });
        }
      }
    },
  };
}