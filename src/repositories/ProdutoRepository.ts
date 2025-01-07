import { AppDataSource } from '../data-source';
import { IProduto } from '../interfaces/IProduto';
import { Produto } from './../entities/Produto';

export const produtoRepository = AppDataSource.getRepository(Produto).extend({
   async saveProduto(data: IProduto): Promise<Produto> {
      const produto = this.create({
         nome: data.nome,
         descricao: data.descricao,
         preco: data.preco,
         quantidade: data.quantidade,
         categoria: data.categoria,
         flAtivo: data.flAtivo,
      });
      return this.save(produto);
   }
});