import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";
import {
  EmployeeBodySchema,
  EmployeeBodyType,
  IdParamsSchema,
  IdParamsType,
} from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "PUT",
    url: "/api/employees/:id",
    schema: {
      body: EmployeeBodySchema,
      params: IdParamsSchema,
    },
    handler: async (request, reply) => {
      const employeeBody = request.body as EmployeeBodyType;
      const params = request.params as IdParamsType;
      try {
        const id = await employeesModel.putEmployee(
          fastify,
          employeeBody,
          params.id
        );
        reply.code(201).send({
          success: true,
          id: id,
        });
      } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
      }
    },
  };
}
