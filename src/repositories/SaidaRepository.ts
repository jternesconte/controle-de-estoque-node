import { AppDataSource } from "../data-source";
import { Saida } from "../entities/Saida";

export const saidaRepository = AppDataSource.getRepository(Saida);