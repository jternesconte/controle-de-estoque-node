import { AppDataSource } from "../data-source";
import { Saida } from "../entities/Saida";
import { ISaida } from "../interfaces/ISaida";

export const saidaRepository = AppDataSource.getRepository(Saida).extend({
   async saveSaida(data: ISaida): Promise<Saida> {
         const saida = this.create({
            produto: data.produto,
            quantidade: data.quantidade,
         });
         return this.save(saida);
      }
});