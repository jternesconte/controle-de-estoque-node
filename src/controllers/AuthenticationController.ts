import { Request, Response } from 'express';
import { usuarioRepository } from '../repositories/UsuarioRepository';
import { IUsuario } from '../interfaces/IUsuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


type JwtPayload ={
   userId: number;
}

export class AuthenticationController {


   // cadastrar novo usuario
   async newCadastro(req: Request, res: Response) {
      try {
         const { nome, email, senha, senha2 } = req.body;

         if(!nome) {
            res.status(404).json({ error: "O campo 'nome' é obrigatório " });
            return;
         }

         if(senha !== senha2) {
            res.status(404).json({ error: 'Confirmação de senha não é válida' });
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

         res.status(201).json('Usuário registrado com sucesso');
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

            if(!isSenhaCombina) {
               res.status(404).json({ error: 'Senha inválida' });
               return;
            }

         } else {
            res.status(404).json({ error: 'Email não cadastrado' });
            return;
         }
         
         const secret = process.env.SECRET_KEY as string;

         const token = jwt.sign({ userId: usuarioExistente.id }, secret, {
            expiresIn:'8h'
         });

         res.status(201).json({ msg: 'Autenticação realizada com sucesso', token });
      } catch {
         res.status(500).json({ error: 'Erro ao realizar login' });
      }
   }

   // editar usuario existente
   async editUser(req: Request, res:Response) {
      try {
         const { nome, senha, senhaAtual } = req.body;

         const usuario = await usuarioRepository.findOneBy({ id: req.user?.id });
         if(!usuario) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
         } else {
            if(nome) {
               usuario.nome = nome;
            }

            if(senha && senhaAtual) {
               const isSenhaAtualValida: boolean = await bcrypt.compare(senhaAtual, usuario.senha);
               if(!isSenhaAtualValida) {
                  res.status(400).json({ error: 'Senha atual incorreta' });
                  return;
               }

               usuario.senha = await bcrypt.hash(senha, 10);
            } else if(senha && !senhaAtual) {
               res.status(400).json({ error: 'É necessário informar a senha atual para alterá-la' });
               return;
            }

            await usuarioRepository.save(usuario);

         }
         
         res.status(200).json({ msg: 'Usuário atualizado com sucesso' })
      } catch {
         res.status(500).json({ error: 'Erro ao editar usuário' });
      }
   }
}