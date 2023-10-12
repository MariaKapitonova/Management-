import { FastifyInstance } from "fastify";
import { EmployeeBodyType } from "../routes/schemas";
import { Tribe } from "./tribes.model";

interface EmployeeDTO {
  id: number;
  name: string;
  title: string;
  tribe: Tribe;
}

interface EmployeeQueryResult {
  id: number;
  name: string;
  title: string;
  "tribe.id": number;
  "tribe.name": string;
  "tribe.department": string;
}

const TABLE_NAME = "employees";

const formatEmployeeDTO = (employee: EmployeeQueryResult): EmployeeDTO => {
  return {
    id: employee.id,
    name: employee.name,
    title: employee.title,
    tribe: {
      id: employee["tribe.id"],
      name: employee["tribe.name"],
      department: employee["tribe.department"],
    },
  };
};

export async function getEmployees(fastify: FastifyInstance) {
  const employees = await fastify.db
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    );

  const result: EmployeeDTO[] = employees.map(formatEmployeeDTO);

  return result;
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
  const employee = await fastify.db
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .where({ "employees.id": id })
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    )
    .first();

  return formatEmployeeDTO(employee);
}

export async function createEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType
) {
  return await fastify.db.from(TABLE_NAME).insert(employee);
}

export async function deleteEmployee(fastify: FastifyInstance, id: number) {
  await fastify.db.from(TABLE_NAME).where({ id }).del();
}
