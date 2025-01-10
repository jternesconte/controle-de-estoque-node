import { Request, Response } from 'express';
import { usuarioRepository } from '../repositories/UsuarioRepository';
import { IUsuario } from '../interfaces/IUsuario';

const bcrypt = require("bcrypt");

export class AuthenticationController {


   // novo cadastro
   async newCadastro(req: Request, res: Response) {
      try {
         const { nome, email, senha, senha2 } = req.body;

         if(senha !== senha2) {
            res.status(404).json({ error: 'Confirmação de senha não está igual' });
            return;
         }

         const usuarioExistente = await usuarioRepository.findOneBy({ email: email });
         if(usuarioExistente) {
            res.status(404).json({ error: 'Email já cadastrado' });
            return;
         }

         const senhaHashed = await bcrypt.hash(senha, 10);

         const newUsuario: IUsuario = {
            nome,
            email,
            senha: senhaHashed
         };

         await usuarioRepository.save(newUsuario);

         res.status(201).json(newUsuario);
      } catch {
         res.status(500).json({ error: 'Erro ao adicionar novo usuário' });
      }
   }

   // realizar login
   async userLogin(req: Request, res: Response) {
      
   }

   // validar se o usuario esta logado
   async isUserLogged(req: Request, res: Response) {

   }
}