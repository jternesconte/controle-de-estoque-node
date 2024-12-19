import { ICategoria } from "./ICategoria";

export interface IProduto {
   nome: string,
   descricao: string,
   preco: number,
   quantidade: number,
   categoria: ICategoria,
   flAtivo: boolean
}