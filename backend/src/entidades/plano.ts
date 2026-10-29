import { Column, Entity } from "typeorm";
import { EntidadeBase } from "./entidade-base";
import { transformadorDecimal } from "../utils/transformador-decimal";

@Entity({ name: "planos" })
export class Plano extends EntidadeBase {
  @Column({ type: "varchar", length: 80, unique: true })
  nome!: string;

  @Column({ type: "text", nullable: true })
  descricao!: string | null;

  @Column({
    name: "valor_base",
    type: "decimal",
    precision: 12,
    scale: 2,
    nullable: true,
    transformer: transformadorDecimal,
  })
  valorBase!: number | null;

  @Column({ type: "boolean", default: true })
  ativo!: boolean;
}