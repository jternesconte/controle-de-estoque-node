import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  senha: string
}
