import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntidadeBase } from "./entidade-base";
import { Cliente } from "./cliente";
import { Plano } from "./plano";
import { Usuario } from "./usuario";
import { transformadorDecimal } from "../utils/transformador-decimal";

export enum StatusEvento {
  ORCAMENTO = "ORCAMENTO",
  CONFIRMADO = "CONFIRMADO",
  EM_PREPARACAO = "EM_PREPARACAO",
  CONCLUIDO = "CONCLUIDO",
  CANCELADO = "CANCELADO",
}

@Entity({ name: "eventos" })
export class Evento extends EntidadeBase {
  @Column({ name: "cliente_id", type: "bigint", unsigned: true })
  clienteId!: number;

  @ManyToOne(() => Cliente, { onUpdate: "CASCADE" })
  @JoinColumn({ name: "cliente_id" })
  cliente!: Cliente;

  @Column({ name: "plano_id", type: "bigint", unsigned: true, nullable: true })
  planoId!: number | null;

  @ManyToOne(() => Plano, { nullable: true, onUpdate: "CASCADE" })
  @JoinColumn({ name: "plano_id" })
  plano!: Plano | null;

  @Column({ name: "criado_por_usuario_id", type: "bigint", unsigned: true })
  criadoPorUsuarioId!: number;

  @ManyToOne(() => Usuario, { onUpdate: "CASCADE" })
  @JoinColumn({ name: "criado_por_usuario_id" })
  criadoPor!: Usuario;

  @Column({ type: "varchar", length: 180 })
  nome!: string;

  @Column({ name: "data_inicio", type: "datetime" })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "datetime" })
  dataFim!: Date;

  @Column({ name: "local_evento", type: "varchar", length: 255 })
  localEvento!: string;

  @Column({ type: "enum", enum: StatusEvento, default: StatusEvento.ORCAMENTO })
  status!: StatusEvento;

  @Column({
    name: "valor_negociado",
    type: "decimal",
    precision: 12,
    scale: 2,
    nullable: true,
    transformer: transformadorDecimal,
  })
  valorNegociado!: number | null;

  @Column({ type: "text", nullable: true })
  observacoes!: string | null;
}