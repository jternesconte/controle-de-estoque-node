import { Request, Response } from 'express';
import { produtoRepository } from '../repositories/ProdutoRepository';
import { entradaRepository } from '../repositories/EntradaRepository';
import { IEntrada } from '../interfaces/IEntrada';

export class EntradaController {

   // nova entrada
   async newEntrada(req: Request, res: Response) {
      try {
         const { quantidade } = req.body;
         const { produtoId } = req.params

         const produto = await produtoRepository.findOneBy({ id: Number(produtoId) });
         if(!produto) {
            res.status(404).json({ error: 'Produto não encontrado com o id: ' + produtoId });
            return;
         }

         produto.quantidade = produto.quantidade + Number(quantidade);

         await produtoRepository.save(produto);

         const newEntrada: IEntrada = { produto, quantidade };


         entradaRepository.saveEntrada(newEntrada);

         res.status(200).json(newEntrada);
      } catch (error) {
         res.status(500).json({ error: 'Erro ao gerar entrada' });
      }
   }

   // get em todas as entradas
   async getEntradas(req: Request, res: Response) {
      try {
         const entradas = await entradaRepository.find();

         res.status(200).json(entradas);
      } catch (error) {
         res.status(500).json({ error: 'Erro ao buscar entradas' });
      }
   }
}