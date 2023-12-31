import { FastifyInstance } from "fastify";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { EmployeeBodyType, SearchParamsType } from "../routes/schemas";
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
const EMPLOYEES_REPORT_CACHE_KEY = "employees_report";

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

export async function getEmployees(
  fastify: FastifyInstance,
  search: SearchParamsType
) {
  const employees = fastify.db
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

  if (search.name)
    employees.where("employees.name", "LIKE", `%${search.name}%`);
  if (search.title)
    employees.where("employees.title", "LIKE", `%${search.title}%`);
  if (search.tribe) employees.where("tribes.name", "LIKE", `%${search.tribe}%`);

  const employeesQueryResult = await employees;
  const result: EmployeeDTO[] = employeesQueryResult.map(formatEmployeeDTO);

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
  if (!employee) {
    const message = `No employee with id ${id} is found`;
    throw new ResourceNotFoundError(message);
  }

  return formatEmployeeDTO(employee);
}

export async function createEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType
) {
  const employeeId = await fastify.db.from(TABLE_NAME).insert(employee);
  await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
  return employeeId;
}

export async function putEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType,
  id: number
) {
  const employeeId = await fastify.db
    .from(TABLE_NAME)
    .where({ "employees.id": id })
    .update(employee);
  await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
  return employeeId;
}

export async function deleteEmployee(fastify: FastifyInstance, id: number) {
  const employee = await fastify.db.from(TABLE_NAME).where({ id }).del();

  if (!employee) {
    const message = `No employee with id ${id} is found`;
    throw new ResourceNotFoundError(message);
  }

  await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
}
