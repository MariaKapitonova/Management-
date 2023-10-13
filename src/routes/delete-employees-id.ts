import { FastifyInstance, RouteOptions } from "fastify";
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
        reply.code(500).send({ error: (error as Error).message });
      }
    },
  };
}