import { Request, Response } from 'express';
import { usuarioRepository } from '../repositories/UsuarioRepository';
import { IUsuario } from '../interfaces/IUsuario';
import bcrypt from 'bcrypt';

export class AuthenticationController {


   // cadastrar novo usuario
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
      try {
         const { email, senha } = req.body;

         const usuarioExistente = await usuarioRepository.findOneBy({ email: email });
         if(usuarioExistente) {
            const isSenhaCombina: boolean = await bcrypt.compare(senha, usuarioExistente.senha);

            if(isSenhaCombina) {
               res.status(201).json('logou');
            } else {
               res.status(404).json({ error: 'Senha inválida' });
            }
         } else {
            res.status(404).json({ error: 'Email não cadastrado' });
            return;
         }

      } catch {
         res.status(500).json({ error: 'Erro ao realizar login' })
      }
   }

   // validar se o usuario esta logado
   async isUserLogged(req: Request, res: Response) {

   }
}