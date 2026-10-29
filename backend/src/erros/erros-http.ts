import { ErroAplicacao } from "./erro-aplicacao";

export class RequisicaoInvalidaErro extends ErroAplicacao {
  readonly statusHttp = 400;

  constructor(mensagem = "Requisição inválida.", detalhes: string[] = []) {
    super(mensagem, detalhes);
  }
}

export class NaoAutenticadoErro extends ErroAplicacao {
  readonly statusHttp = 401;

  constructor(mensagem = "Não autenticado.") {
    super(mensagem);
  }
}

export class AcessoNegadoErro extends ErroAplicacao {
  readonly statusHttp = 403;

  constructor(mensagem = "Você não tem permissão para isso.") {
    super(mensagem);
  }
}

export class RecursoNaoEncontradoErro extends ErroAplicacao {
  readonly statusHttp = 404;

  constructor(mensagem = "Recurso não encontrado.") {
    super(mensagem);
  }
}

export class ConflitoErro extends ErroAplicacao {
  readonly statusHttp = 409;

  constructor(mensagem = "Conflito com dados já existentes.") {
    super(mensagem);
  }
}