import { Router } from "express";
import type { AutenticacaoControlador } from "../controladores/autenticacao-controlador";

export function criarRotasAutenticacao(
  controlador: AutenticacaoControlador,
): Router {
  const rotas = Router();
  rotas.post("/login", controlador.login);
  return rotas;
}