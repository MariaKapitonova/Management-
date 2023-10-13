import { FastifyInstance } from "fastify";
import knexPlugin from "./plugins/knex";
import routes from "./routes";

const env = process.env.ENVIRONMENT ?? "development";

async function app(fastify: FastifyInstance) {
  fastify.register(knexPlugin);
  fastify.register(routes);

  console.log(`✅ fastify instance configured (env: ${env})\n`);
}

export default app;