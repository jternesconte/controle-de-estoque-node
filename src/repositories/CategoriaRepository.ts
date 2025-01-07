import { AppDataSource } from '../data-source';
import { ICategoria } from '../interfaces/ICategoria';
import { Categoria } from './../entities/Categoria';

export const categoriaRepository = AppDataSource.getRepository(Categoria).extend({
   async saveCategoria(data: ICategoria): Promise<Categoria> {
      const categoria = this.create({
         nome: data.nome,
         descricao: data.descricao,
         flAtivo: data.flAtivo,
      });
      return this.save(categoria);
   }
});

   