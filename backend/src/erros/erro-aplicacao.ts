export abstract class ErroAplicacao extends Error {
  abstract readonly statusHttp: number;

  constructor(
    mensagem: string,
    public readonly detalhes: string[] = [],
  ) {
    super(mensagem);
    this.name = new.target.name;
  }
}