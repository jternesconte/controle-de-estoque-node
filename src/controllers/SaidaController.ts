import { Request, Response } from 'express';
import { produtoRepository } from '../repositories/ProdutoRepository';
import { saidaRepository } from '../repositories/SaidaRepository';
import { ISaida } from '../interfaces/ISaida';

export class SaidaController {

   // nova saida
   async newSaida(req: Request, res: Response) {
      try {
         const { quantidade } = req.body;
         const { produtoId } = req.params

         const produto = await produtoRepository.findOneBy({ id: Number(produtoId) });
         if(!produto) {
            res.status(404).json({ error: 'Produto não encontrado com o id: ' + produtoId });
            return;
         }

         if(produto.quantidade < Number(quantidade)) {
            res.status(404).json({ error: 'Não permitido produto com quantidade negativa' });
            return;
         } else {
            produto.quantidade = produto.quantidade - Number(quantidade);
            await produtoRepository.save(produto);
         }


         const newSaida: ISaida = { produto, quantidade };


         saidaRepository.saveSaida(newSaida);

         res.status(200).json(newSaida);
      } catch (error) {
         res.status(500).json({ error: 'Erro ao gerar saída' });
      }
   }

   // get em todas as saidas
   async getSaidas(req: Request, res: Response) {
      try {
         const saidas = await saidaRepository.find();

         res.status(200).json(saidas);
      } catch (error) {
         res.status(500).json({ error: 'Erro ao buscar saídas' });
      }
   }
}