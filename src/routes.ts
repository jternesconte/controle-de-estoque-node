import { SaidaController } from './controllers/SaidaController';
import { Router } from 'express';
import { CategoriaController } from './controllers/CategoriaController';
import { ProdutoController } from './controllers/ProdutoController';
import { EntradaController } from './controllers/EntradaController';

const routes = Router();

/* // Rotas Produto

   // Rota para obter todos os produtos
   routes.get('/getAllProdutos', new ProdutoController().getAllProdutos);

   // Rota para adicionar um novo produto
   routes.post('/adicionarProduto/:categoriaId', new ProdutoController().novoProduto);

   // Rota para obter produtos ativos
   routes.get('/getProdutos/ativos', new ProdutoController().getAtivos);

   // Rota para obter produtos inativos
   routes.get('/getProdutos/inativos', new ProdutoController().getInativos);

   // Rota para editar um produto
   routes.put('/alterarItem/:id/:categoriaId', new ProdutoController().editarProduto); */

// Rotas Categoria

   // Rota para obter todas as categorias
   routes.get('/getAllCategorias', new CategoriaController().getCategorias);

   // Rota para obter categorias ativas
   routes.get('/getCategorias/ativos', new CategoriaController().getAtivos);

   // Rota para obter categorias inativas
   routes.get('/getCategorias/inativos', new CategoriaController().getInativos);

   // Rota para adicionar uma nova categoria
   routes.post('/adicionarCategoria', new CategoriaController().novaCategoria);

   // Rota para editar uma categoria
   routes.put('/alterarCategoria/:id', new CategoriaController().editarCategoria);


/* // Rotas Entrada

   // Rota para obter todas as entradas
   routes.get('/getAllEntradas', new EntradaController().getAllEntradas);

   // Rota para adicionar uma nova entrada
   routes.post('/novaEntrada/:produtoId', new EntradaController().novaEntrada);

// Rotas Saida

   // Rota para obter todas as saídas
   routes.get('/getAllSaidas', new SaidaController().getAllSaidas);

   // Rota para adicionar uma nova saída
   routes.post('/novaSaida/:produtoId', new SaidaController().novaSaida); */


export default routes