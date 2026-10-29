import type { UsuarioAutenticado } from "./usuario-autenticado";

declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioAutenticado;
    }
  }
}

export {};