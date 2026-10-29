import { Column, Entity } from "typeorm";
import { EntidadeBase } from "./entidade-base";

export enum TipoPessoa {
  FISICA = "FISICA",
  JURIDICA = "JURIDICA",
}

@Entity({ name: "clientes" })
export class Cliente extends EntidadeBase {
  @Column({ name: "tipo_pessoa", type: "enum", enum: TipoPessoa, default: TipoPessoa.FISICA })
  tipoPessoa!: TipoPessoa;

  @Column({ type: "varchar", length: 180 })
  nome!: string;

  @Column({ type: "varchar", length: 14, unique: true })
  documento!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 20 })
  telefone!: string;

  @Column({ type: "text", nullable: true })
  observacoes!: string | null;
}