import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/UsuarioRepository';

type JwtPayload ={
  userId: number;
}

const secret = process.env.SECRET_KEY as string;

export const authenticateToken = async(req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido.' });
    return;
  }

  const { userId } = jwt.verify(token, secret ?? '') as JwtPayload;

  const user = await usuarioRepository.findOneBy({ id: userId });
  
  if (!user) {
    res.status(401).json({ msg: 'Token inválido ou expirado.' });
    return;
  }

  const { senha: _, ...loggedUser} = user;

  req.user = loggedUser;

  next();
}