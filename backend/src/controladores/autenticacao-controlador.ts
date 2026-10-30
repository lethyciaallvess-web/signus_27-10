import type { Request, Response } from "express";
import { validarDadosLogin } from "../dtos/login-dto";
import type { AutenticacaoServico } from "../servicos/autenticacao-servico";

export class AutenticacaoControlador {
  constructor(private readonly servico: AutenticacaoServico) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const dados = validarDadosLogin(req.body);
    const resposta = await this.servico.login(dados);
    res.status(200).json(resposta);
  };
}