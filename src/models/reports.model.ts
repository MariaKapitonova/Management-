import { FastifyInstance } from "fastify";

const EMPLOYEES_TABLE = "employees";
const TRIBES_TABLE = "tribes";

const EMPLOYEES_REPORT_CACHE_KEY = "employees_report";

export async function getReports(fastify: FastifyInstance){

   const cache = await fastify.cache.get(EMPLOYEES_REPORT_CACHE_KEY);
   if (cache) {
    return JSON.parse(cache);
  }

    const tribes = await fastify.db.from(TRIBES_TABLE);
    const employeesOfTribe = await fastify.db.from(EMPLOYEES_TABLE);
    const result = [];
    
    for(let tribe of tribes){
        result.push({
            tribe_name: tribe.name,
            employees: employeesOfTribe.filter(x => x.tribe_id === tribe.id),
        });
    }

    await fastify.cache.set(EMPLOYEES_REPORT_CACHE_KEY, JSON.stringify(result), { EX: 60 });

    return result;
}
