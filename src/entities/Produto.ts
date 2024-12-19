import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "./Categoria";
import { BooleanToStringConverter } from "../utils/BooleanToStringConverter";

@Entity("produtos")
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  nome: string;

  @Column({ type: "text", nullable: true })
  descricao: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ type: "int", nullable: false, default: 0 })
  quantidade: number;

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: "categoria_id", referencedColumnName: 'id' })
  categoria: Categoria;

  @Column({
    name: "fl_ativo",
    type: "char",
    length: 1,
    nullable: false,
    default: 'S',
    transformer: new BooleanToStringConverter(),
  })
  flAtivo: boolean;
}
