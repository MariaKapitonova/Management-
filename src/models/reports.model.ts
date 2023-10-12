import { FastifyInstance } from "fastify";

const EMPLOYEES_TABLE = "employees";
const TRIBES_TABLE = "tribes";

export async function getReports(fastify: FastifyInstance){
    const tribes = await fastify.db.from(TRIBES_TABLE);
    const employeesOfTribe = await fastify.db.from(EMPLOYEES_TABLE);
    const result = [];
    
    for(let tribe of tribes){
        result.push({
            tribe_name: tribe.name,
            employees: employeesOfTribe.filter(x => x.tribe_id === tribe.id),
        });
    }
    return result;
}
