import type { PerfilUsuario } from "../entidades/usuario";

export interface ConteudoJwt {
  sub: number;
  email: string;
  perfil: PerfilUsuario;
}

export interface UsuarioAutenticado {
  id: number;
  email: string;
  perfil: PerfilUsuario;
}