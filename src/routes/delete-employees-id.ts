import { FastifyInstance, RouteOptions } from "fastify";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import * as employeesModel from "../models/employees.model";
import { IdParamsSchema, IdParamsType } from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "DELETE",
    url: "/api/employees/:id",
    schema: {
      params: IdParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;

      try {
        await employeesModel.deleteEmployee(fastify, params.id);
        reply.code(200).send({ success: true });
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