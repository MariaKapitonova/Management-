// import { FastifyInstance, RouteOptions } from "fastify";
// import * as employeesModel from "../models/employees.model";

// export default function (fastify: FastifyInstance): RouteOptions {
//   return {
//     method: "GET",
//     url: "/api/employees/report",
//     handler: async (request, reply) => {
//       const employees = await employeesModel.getReport(fastify);
//       reply.code(200).send(employees);
//     },
//   };
// }
