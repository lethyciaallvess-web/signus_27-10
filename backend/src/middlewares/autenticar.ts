import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ambiente } from "../config/ambiente";
import { NaoAutenticadoErro } from "../erros/erros-http";
import type {
  ConteudoJwt,
  UsuarioAutenticado,
} from "../tipos/usuario-autenticado";

function ehConteudoJwt(valor: unknown): valor is ConteudoJwt {
  if (typeof valor !== "object" || valor === null) {
    return false;
  }
  const { sub, email, perfil } = valor as Record<string, unknown>;
  return (
    typeof sub === "number" &&
    typeof email === "string" &&
    typeof perfil === "string"
  );
}

export function autenticar(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const cabecalho = req.headers.authorization;

  if (!cabecalho?.startsWith("Bearer ")) {
    throw new NaoAutenticadoErro("Token de acesso não informado.");
  }

  const token = cabecalho.slice("Bearer ".length).trim();

  let conteudo: unknown;
  try {
    conteudo = jwt.verify(token, ambiente.jwt.segredo);
  } catch {
    throw new NaoAutenticadoErro("Token inválido ou expirado.");
  }

  if (!ehConteudoJwt(conteudo)) {
    throw new NaoAutenticadoErro("Token inválido ou expirado.");
  }

  req.usuario = {
    id: conteudo.sub,
    email: conteudo.email,
    perfil: conteudo.perfil,
  };
  next();
}

export function obterUsuarioAutenticado(req: Request): UsuarioAutenticado {
  if (!req.usuario) {
    throw new NaoAutenticadoErro();
  }
  return req.usuario;
}