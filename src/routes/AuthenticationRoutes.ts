import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

export const authenticationRoutes = Router();

//Rota para cadastrar usuario
authenticationRoutes.post('/register', new AuthenticationController().newCadastro);

//Rota para realizar login
authenticationRoutes.post('/login', new AuthenticationController().userLogin);

//Rota para editar usuario
authenticationRoutes.put('/editUser', new AuthenticationController().editUser);