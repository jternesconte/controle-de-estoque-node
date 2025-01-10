import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import { IUsuario } from "../interfaces/IUsuario";

export const usuarioRepository = AppDataSource.getRepository(Usuario).extend({
   async saveUsuario(data: IUsuario): Promise<Usuario> {
         const usuario = this.create({
            nome: data.nome,
            email: data.email,
            senha: data.senha
         });
         return this.save(usuario);
      }
});