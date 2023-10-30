import { FastifyInstance, RouteOptions } from "fastify";
import * as cacheModel from "../models/maintenance.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "DELETE",
    url: "/cache",
    handler: async (request, reply) => {
        await cacheModel.deleteCache(fastify);
        reply.code(200).send({ success: true });
    },
  };
}