import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BooleanToStringConverter } from "../utils/BooleanToStringConverter";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  nome: string;

  @Column({ type: "text", nullable: true })
  descricao: string;

  @Column({
    name: "fl_ativo",
    type: "char",
    length: 1,
    nullable: false,
    default: 'S',
    transformer: new BooleanToStringConverter(),
  })
  flAtivo: boolean;

  constructor(nome?: string, descricao?: string, flAtivo?: boolean) {
    if (nome) this.nome = nome;
    if (descricao) this.descricao = descricao;
    if (flAtivo !== undefined) this.flAtivo = flAtivo;
  }
}