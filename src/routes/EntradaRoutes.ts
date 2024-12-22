import { Router } from "express";
import { EntradaController } from "../controllers/EntradaController";

export const entradaRoutes = Router();

// Rota para obter todas as entradas
entradaRoutes.get('/getAll', new EntradaController().getEntradas);

// Rota para adicionar uma nova entrada
entradaRoutes.post('/newEntrada/:produtoId', new EntradaController().newEntrada);