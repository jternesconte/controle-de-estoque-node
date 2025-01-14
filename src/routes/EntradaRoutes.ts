import { Router } from "express";
import { EntradaController } from "../controllers/EntradaController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const entradaRoutes = Router();

entradaRoutes.use(authenticateToken);

// Rota para obter todas as entradas
entradaRoutes.get('/getAll', new EntradaController().getEntradas);

// Rota para adicionar uma nova entrada
entradaRoutes.post('/newEntrada/:produtoId', new EntradaController().newEntrada);