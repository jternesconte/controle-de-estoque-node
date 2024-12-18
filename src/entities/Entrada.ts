import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { Produto } from "./Produto";

@Entity("entradas")
export class Entrada {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto, { nullable: false })
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @Column({ type: "int", nullable: false })
  quantidade: number;

  @CreateDateColumn({
    name: "data_entrada",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    update: false,
  })
  dataEntrada: Date;

  constructor(produto?: Produto, quantidade?: number) {
    if (produto) this.produto = produto;
    if (quantidade !== undefined) this.quantidade = quantidade;
  }
}
