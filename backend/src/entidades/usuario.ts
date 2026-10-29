import { Column, Entity } from "typeorm";
import { EntidadeBase } from "./entidade-base";

export enum PerfilUsuario {
  ADMIN = "ADMIN",
  OPERADOR = "OPERADOR",
}

@Entity({ name: "usuarios" })
export class Usuario extends EntidadeBase {
  @Column({ type: "varchar", length: 150 })
  nome!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "char", length: 11, unique: true })
  cpf!: string;

  @Column({ name: "senha_hash", type: "varchar", length: 255, select: false })
  senhaHash!: string;

  @Column({ type: "enum", enum: PerfilUsuario, default: PerfilUsuario.OPERADOR })
  perfil!: PerfilUsuario;
}