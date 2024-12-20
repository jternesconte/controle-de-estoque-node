import { Request, Response } from 'express';
import { categoriaRepository } from '../repositories/CategoriaRepository';

export class CategoriaController {
  // Obter todas as categorias
  async getCategorias(req: Request, res: Response) {
    try {
      const categorias = await categoriaRepository.find();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  // Obter categorias ativas
  async getAtivos(req: Request, res: Response) {
    try {
      const categoriasAtivas = await categoriaRepository.find({ where: { flAtivo: true } });
      res.status(200).json(categoriasAtivas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias ativas' });
    }
  }

  // Obter categorias inativas
  async getInativos(req: Request, res: Response) {
    try {
      const categoriasInativas = await categoriaRepository.find({ where: { flAtivo: false } });
      res.status(200).json(categoriasInativas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias inativas' });
    }
  }

  // Adicionar uma nova categoria
  async novaCategoria(req: Request, res: Response) {
    try {
      const { nome, descricao } = req.body;
      const novaCategoria = await categoriaRepository.create({
        nome,
        descricao,
        flAtivo: true,
      });

      await categoriaRepository.save(novaCategoria);

      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar nova categoria' });
    }
  }

  // Editar uma categoria existente
  async editarCategoria(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, flAtivo } = req.body;

      const categoriaExistente = await categoriaRepository.findOneBy({ id: Number(id) });

      if (!categoriaExistente) {
        res.status(404).json({ error: 'Categoria não encontrada' });
        return;
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
