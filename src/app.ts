import Fastify, { FastifyInstance } from "fastify";
import knexPlugin from "./plugins/knex";
import routes from "./routes";

const fastify: FastifyInstance = Fastify();

fastify.register(knexPlugin);
fastify.register(routes);

export default fastify;
