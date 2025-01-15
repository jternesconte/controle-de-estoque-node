import { IProduto } from "./IProduto";
import { IUsuario } from "./IUsuario";

export interface IEntrada {
   produto: IProduto,
   quantidade: number,
   usuario: IUsuario
}