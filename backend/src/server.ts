import { criarApp } from "./app";
import { ambiente } from "./config/ambiente";
import { fonteDeDados } from "./config/banco";

const TENTATIVAS = 15;
const ESPERA_MS = 3000;

const esperar = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function conectarAoBanco(): Promise<void> {
  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
    try {
      await fonteDeDados.initialize();
      console.log("Banco de dados conectado.");
      return;
    } catch (erro) {
      console.error(
        `Falha ao conectar ao banco (tentativa ${tentativa}/${TENTATIVAS}).`,
      );
      if (tentativa === TENTATIVAS) {
        throw erro;
      }
      await esperar(ESPERA_MS);
    }
  }
}

async function iniciar(): Promise<void> {
  await conectarAoBanco();
  criarApp(fonteDeDados).listen(ambiente.porta, () => {
    console.log(`API rodando na porta ${ambiente.porta}`);
  });
}

iniciar().catch((erro) => {
  console.error(erro);
  process.exit(1);
});