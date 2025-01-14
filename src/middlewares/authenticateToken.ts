import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../entities/Usuario';
import { UnauthorizedError } from '../helpers/api-errors';

type JwtPayload ={
  id: number;
}

const secret = process.env.SECRET_KEY as string;

export const authenticateToken = async(req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Token não fornecido.');
  }

  const { id } = jwt.verify(token, secret ?? '') as JwtPayload;

  const user = await usuarioRepository.findOneBy({ id });
  
  if (!user) {
    throw new UnauthorizedError('Token inválido ou expirado.');
  }

  const { senha: _, ...loggedUser} = user;

  req.user = loggedUser;

  next();
};
