import { Request, Response } from 'express';
import { produtoRepository } from '../repositories/ProdutoRepository';
import { categoriaRepository } from '../repositories/CategoriaRepository';

export class ProdutoController {

   // get em todos os produtos
   async getProdutos(req: Request, res: Response) {
      try {
         const produtos = await produtoRepository.find();
         res.status(200).json(produtos);
      } catch (error) {
         res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
   }

   // get nos produtos ativas
   async getAtivos(req: Request, res: Response) {
      try {
      const produtosAtivos = await produtoRepository.find({ where: { flAtivo: true } });
      res.status(200).json(produtosAtivos);
      } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos ativos' });
      }
   }
   
   // get nos produtos inativas
   async getInativos(req: Request, res: Response) {
      try {
      const produtosInativos = await produtoRepository.find({ where: { flAtivo: false } });
      res.status(200).json(produtosInativos);
      } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos inativos' });
      }
   }

   // adicionar novo produto
   async newProduto(req: Request, res: Response) {
      try {
         const { nome, descricao, preco, quantidade } = req.body;
         const { categoriaId } = req.params;

         const categoria = await categoriaRepository.findOneBy({ id: Number(categoriaId) });
         if(!categoria) {
            res.status(404).json({ error: 'Categoria não encontrada' });
            return;
         }

         const newProduto = produtoRepository.create({
            nome,
            descricao,
            preco,
            quantidade,
            categoria,
            flAtivo: true // padrão
         });

         await produtoRepository.save(newProduto);

         res.status(201).json(newProduto);
      } catch {
         res.status(500).json({ error: 'Erro ao adicionar novo produto' });
      }
   }

   // editar um produto existente
   async editProduto(req: Request, res: Response) {
      try {
         const { nome, descricao, preco, quantidade, flAtivo } = req.body;
         const { id, categoriaId } = req.params

         const produtoExistente = await produtoRepository.findOneBy({ id: Number(id) });
         if(!produtoExistente) {
            res.status(404).json({ error: 'Produto não encontrado com o id: ' + id });
            return;
         }

         // atualiza os campos do produto
         produtoExistente.nome = nome ?? produtoExistente.nome;
         produtoExistente.descricao = descricao ?? produtoExistente.descricao;
         produtoExistente.preco = preco ?? produtoExistente.preco;
         produtoExistente.quantidade = quantidade ?? produtoExistente.quantidade;
         produtoExistente.flAtivo = flAtivo ?? produtoExistente.flAtivo;

         if(categoriaId) {
            const categoria = await categoriaRepository.findOneBy({ id: Number(categoriaId) });
            if(!categoria) {
               res.status(404).json({ error: 'Categoria não encontrada com o id: ' + categoriaId });
               return;
            }
            produtoExistente.categoria = categoria;
         }

         const produtoAtualizado = await produtoRepository.save(produtoExistente);
         res.status(200).json(produtoAtualizado);
      } catch {
         res.status(500).json({ error: 'Erro ao editar produto' });
      }
   }
}