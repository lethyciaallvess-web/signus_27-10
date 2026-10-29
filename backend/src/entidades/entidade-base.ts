import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class EntidadeBase {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @CreateDateColumn({ name: "criado_em", type: "timestamp" })
  criadoEm!: Date;

  @UpdateDateColumn({ name: "atualizado_em", type: "timestamp" })
  atualizadoEm!: Date;
}