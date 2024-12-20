import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

export const categoriaRoutes = Router();

// Rota para obter todas as categorias
categoriaRoutes.get('/getAll', new CategoriaController().getCategorias);

// Rota para obter categorias ativas
categoriaRoutes.get('/get/ativos', new CategoriaController().getAtivos);

// Rota para obter categorias inativas
categoriaRoutes.get('/get/inativos', new CategoriaController().getInativos);

// Rota para adicionar uma nova categoria
categoriaRoutes.post('/newCategoria', new CategoriaController().newCategoria);

// Rota para editar uma categoria
categoriaRoutes .put('/editCategoria/:id', new CategoriaController().editCategoria);