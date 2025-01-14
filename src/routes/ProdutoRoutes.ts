import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const produtoRoutes = Router();

produtoRoutes.use(authenticateToken);

// Rota para obter todos os produtos
produtoRoutes.get('/getAll', new ProdutoController().getProdutos);

// Rota para adicionar um novo produto
produtoRoutes.post('/newProduto/:categoriaId', new ProdutoController().newProduto);

// Rota para obter produtos ativos
produtoRoutes.get('/get/ativos', new ProdutoController().getAtivos);

// Rota para obter produtos inativos
produtoRoutes.get('/get/inativos', new ProdutoController().getInativos);

// Rota para editar um produto
produtoRoutes.put('/editProduto/:id/:categoriaId', new ProdutoController().editProduto);