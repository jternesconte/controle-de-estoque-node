import { AppDataSource } from "../data-source";
import { Entrada } from "../entities/Entrada";
import { IEntrada } from "../interfaces/IEntrada";

export const entradaRepository = AppDataSource.getRepository(Entrada).extend({
   async saveEntrada(data: IEntrada): Promise<Entrada> {
      const entrada = this.create({
         produto: data.produto,
         quantidade: data.quantidade,
         usuario: data.usuario
      });
      return this.save(entrada);
   }
});