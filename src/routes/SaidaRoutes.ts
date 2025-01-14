import { Router } from "express";
import { SaidaController } from "../controllers/SaidaController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const saidaRoutes = Router();

saidaRoutes.use(authenticateToken);

// Rota para obter todas as saídas
saidaRoutes.get('/getAll', new SaidaController().getSaidas);

// Rota para adicionar uma nova saída
saidaRoutes.post('/newSaida/:produtoId', new SaidaController().newSaida);