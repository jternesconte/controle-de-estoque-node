import { AppDataSource } from "../data-source";
import { Entrada } from "../entities/Entrada";

export const entradaRepository = AppDataSource.getRepository(Entrada);