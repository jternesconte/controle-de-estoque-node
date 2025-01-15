import { IProduto } from "./IProduto";
import { IUsuario } from "./IUsuario";

export interface ISaida {
   produto: IProduto,
   quantidade: number,
   usuario: IUsuario
}