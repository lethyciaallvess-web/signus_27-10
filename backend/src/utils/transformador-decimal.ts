import type { ValueTransformer } from "typeorm";

export const transformadorDecimal: ValueTransformer = {
  to: (valor?: number | null) => valor,
  from: (valor?: string | null) =>
    valor === null || valor === undefined ? null : Number(valor),
};