import { Static, Type } from "@sinclair/typebox";

export const EmployeeBodySchema = Type.Object({
  name: Type.String(),
  title: Type.String(),
  tribe_id: Type.Integer(),
});

export const SearchParamsSchema = Type.Object({
  name: Type.Optional(Type.String()),
  title: Type.Optional(Type.String()),
  tribe: Type.Optional(Type.String()),
});

export const IdParamsSchema = Type.Object({
  id: Type.Integer(),
});

export type EmployeeBodyType = Static<typeof EmployeeBodySchema>;
export type IdParamsType = Static<typeof IdParamsSchema>;
export type SearchParamsType = Static<typeof SearchParamsSchema>;
