import { FastifyInstance, RouteOptions } from "fastify";
import * as reportsModel from "../models/reports.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/reports/employees",
    handler: async (request, reply) => {
      const employees = await reportsModel.getReports(fastify);
      reply.code(200).send(employees);
    },
  };
}
