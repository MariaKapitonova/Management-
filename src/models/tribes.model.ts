import { FastifyInstance } from "fastify";

export interface Tribe{
    id: number;
    name: string;
    department: string;
}

  const TABLE_NAME = "tribes";

  export async function getAllTribes(fastify: FastifyInstance) {
    const tribes = await fastify.db
      .from(TABLE_NAME)
      .select(
        "tribes.id as id",
        "tribes.name as name",
        "tribes.department as department"
      );

    return tribes;
  }
  export async function getTribe(fastify: FastifyInstance, id: number) {
    const tribes = await fastify.db
      .from(TABLE_NAME)
      .where({"id": id})
      .select(
        "tribes.id as id",
        "tribes.name as name",
        "tribes.department as department"
      )
      .first();
        
    return tribes;
  }