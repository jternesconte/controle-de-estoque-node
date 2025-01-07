import { produtoRepository } from './../repositories/ProdutoRepository';
import { Request, Response } from 'express';
import { categoriaRepository } from '../repositories/CategoriaRepository';
import { ICategoria } from '../interfaces/ICategoria';

export class CategoriaController {

  // get em todas as categorias
  async getCategorias(req: Request, res: Response) {
    try {
      const categorias = await categoriaRepository.find();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  // get nas categorias ativas
  async getAtivos(req: Request, res: Response) {
    try {
      const categoriasAtivas = await categoriaRepository.find({ where: { flAtivo: true } });
      res.status(200).json(categoriasAtivas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias ativas' });
    }
  }

  // get nas categorias inativas
  async getInativos(req: Request, res: Response) {
    try {
      const categoriasInativas = await categoriaRepository.find({ where: { flAtivo: false } });
      res.status(200).json(categoriasInativas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias inativas' });
    }
  }

  // adicionar uma nova categoria
  async newCategoria(req: Request, res: Response) {
    try {
      const { nome, descricao } = req.body;

      const novaCategoria: ICategoria = {
        nome,
        descricao,
        flAtivo: true //padrao,
      };

      await categoriaRepository.saveCategoria(novaCategoria);

      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar nova categoria' });
    }
  }

  // editar uma categoria existente
  async editCategoria(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, flAtivo } = req.body; 
    
      const categoriaExistente = await categoriaRepository.findOneBy({ id: Number(id) });

      if (!categoriaExistente) {
        res.status(404).json({ error: 'Categoria não encontrada' });
        return;
      }

      if((categoriaExistente.flAtivo !== flAtivo) && flAtivo === false) {

        let produtosDaCategoria = await produtoRepository.find({ where: { categoria: { id: Number(id) } } });

        produtosDaCategoria.forEach(r => {
          r.flAtivo = false;

          produtoRepository.save(r);
        })
      }

      categoriaExistente.nome = nome || categoriaExistente.nome;
      categoriaExistente.descricao = descricao || categoriaExistente.descricao;
      categoriaExistente.flAtivo = flAtivo !== undefined ? flAtivo : categoriaExistente.flAtivo;

      await categoriaRepository.save(categoriaExistente);

      res.status(200).json(categoriaExistente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao editar categoria' });
    }
  }
  
}
