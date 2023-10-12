import { FastifyInstance } from "fastify";

import deleteEmployeesId from "./delete-employees-id";
import getAllTribes from "./get-all-tribes";
import getEmployees from "./get-employees";
import getEmployeesId from "./get-employees-id";
import getReport from "./get-reports-employees";
import getTribe from "./get-tribe";
import postEmployees from "./post-employees";

export default async function (fastify: FastifyInstance) {
  fastify.route(getEmployees(fastify));
  fastify.route(getEmployeesId(fastify));
  fastify.route(deleteEmployeesId(fastify));
  fastify.route(postEmployees(fastify));
  fastify.route(getAllTribes(fastify));
  fastify.route(getTribe(fastify));
  fastify.route(getReport(fastify));
}
