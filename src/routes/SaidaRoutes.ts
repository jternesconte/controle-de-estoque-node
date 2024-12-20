import { Router } from "express";
import { SaidaController } from "../controllers/SaidaController";

export const saidaRoutes = Router();

/* // Rota para obter todas as saídas
saidaRoutes.get('/getAll', new SaidaController().getAllSaidas);

// Rota para adicionar uma nova saída
saidaRoutes.post('/newSaida/:produtoId', new SaidaController().novaSaida); */