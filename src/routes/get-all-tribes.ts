import { FastifyInstance, RouteOptions } from "fastify";
import * as tribesModel from "../models/tribes.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes",
    handler: async (request, reply) => {
      try {
        const employees = await tribesModel.getAllTribes(fastify);
        reply.code(200).send(employees);
      } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
      }
    },
  };
}