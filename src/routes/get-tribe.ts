import { FastifyInstance, RouteOptions } from "fastify";
import * as tribesModel from "../models/tribes.model";
import { IdParamsSchema, IdParamsType } from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes/:id",
    schema: {
      params: IdParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;
      const tribe = await tribesModel.getTribe(fastify, params.id);
      reply.code(200).send(tribe);
    },
  };
}
