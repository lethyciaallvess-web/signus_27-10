import { RequisicaoInvalidaErro } from "../erros/erros-http";
import { emailValido } from "../utils/validacoes";

export interface DadosLogin {
  email: string;
  senha: string;
}

export function validarDadosLogin(corpo: unknown): DadosLogin {
  const bruto = (
    typeof corpo === "object" && corpo !== null ? corpo : {}
  ) as Record<string, unknown>;

  const email =
    typeof bruto.email === "string" ? bruto.email.trim().toLowerCase() : "";
  const erros: string[] = [];

  if (!emailValido(email)) {
    erros.push("Informe um e-mail válido.");
  }

  if (typeof bruto.senha !== "string") {
    erros.push("A senha deve ser um texto.");
  } else if (bruto.senha.length < 8) {
    erros.push("A senha deve possuir pelo menos 8 caracteres.");
  } else if (bruto.senha.length > 72) {
    erros.push("A senha deve possuir no máximo 72 caracteres.");
  }

  if (erros.length > 0) {
    throw new RequisicaoInvalidaErro("Dados de login inválidos.", erros);
  }

  return { email, senha: bruto.senha as string };
}