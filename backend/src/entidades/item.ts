import { Column, Entity } from "typeorm";
import { EntidadeBase } from "./entidade-base";

@Entity({ name: "itens" })
export class Item extends EntidadeBase {
  @Column({ type: "varchar", length: 50, unique: true })
  codigo!: string;

  @Column({ type: "varchar", length: 150 })
  nome!: string;

  @Column({ type: "varchar", length: 80 })
  categoria!: string;

  @Column({ name: "quantidade_total", type: "int", unsigned: true, default: 0 })
  quantidadeTotal!: number;

  @Column({ type: "text", nullable: true })
  descricao!: string | null;

  @Column({ type: "boolean", default: true })
  ativo!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  imagem!: string | null;
}