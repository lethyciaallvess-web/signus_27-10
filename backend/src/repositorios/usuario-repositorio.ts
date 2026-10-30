import type { Repository } from "typeorm";
import { Usuario } from "../entidades/usuario";

export interface RepositorioDeCredenciais {
  buscarPorEmailComSenha(email: string): Promise<Usuario | null>;
}

export class UsuarioRepositorio implements RepositorioDeCredenciais {
  constructor(private readonly repositorio: Repository<Usuario>) {}

  buscarPorEmailComSenha(email: string): Promise<Usuario | null> {
    return this.repositorio
      .createQueryBuilder("usuario")
      .addSelect("usuario.senhaHash")
      .where("usuario.email = :email", { email })
      .getOne();
  }
}