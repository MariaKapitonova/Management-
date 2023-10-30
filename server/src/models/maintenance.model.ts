import { FastifyInstance } from "fastify";

const EMPLOYEES_REPORT_CACHE_KEY = "employees_report";

export async function deleteCache(fastify: FastifyInstance) {
    await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
  }