import type { NextFunction, Request, Response } from "express";
import { ErroAplicacao } from "../erros/erro-aplicacao";
import { RecursoNaoEncontradoErro } from "../erros/erros-http";

export function rotaNaoEncontrada(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new RecursoNaoEncontradoErro("Rota não encontrada."));
}

function ehJsonInvalido(erro: unknown): boolean {
  return (
    typeof erro === "object" &&
    erro !== null &&
    "type" in erro &&
    erro.type === "entity.parse.failed"
  );
}


export function tratarErros(
  erro: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (erro instanceof ErroAplicacao) {
    res.status(erro.statusHttp).json({
      statusCode: erro.statusHttp,
      message: erro.detalhes.length > 0 ? erro.detalhes : erro.message,
      error: erro.name,
    });
    return;
  }

  if (ehJsonInvalido(erro)) {
    res.status(400).json({
      statusCode: 400,
      message: "O corpo da requisição não é um JSON válido.",
      error: "RequisicaoInvalidaErro",
    });
    return;
  }

  console.error(erro);
  res.status(500).json({
    statusCode: 500,
    message: "Erro interno do servidor.",
    error: "ErroInterno",
  });
}