import { existsSync } from "node:fs";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

function obrigatoria(nome: string): string {
  const valor = process.env[nome];
  if (!valor) {
    throw new Error(`Variável de ambiente ${nome} não foi definida.`);
  }
  return valor;
}

export const ambiente = {
  porta: Number(process.env.PORT ?? 3001),
  banco: {
    host: obrigatoria("DB_HOST"),
    porta: Number(process.env.DB_PORT ?? 3306),
    usuario: obrigatoria("DB_USERNAME"),
    senha: process.env.DB_PASSWORD ?? "",
    nome: obrigatoria("DB_DATABASE"),
  },
  jwt: {
    segredo: obrigatoria("JWT_SECRET"),
    expiracao: process.env.JWT_EXPIRES_IN ?? "1d",
  },
} as const;