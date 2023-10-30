import { FastifyInstance, RouteOptions } from "fastify";
import * as reportsModel from "../models/reports.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/reports/employees",
    handler: async (request, reply) => {
      try {
        const report = await reportsModel.getReports(fastify);
        reply.code(200).send(report);
      } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
      }
    },
  };
}