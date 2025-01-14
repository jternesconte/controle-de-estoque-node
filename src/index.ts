import express from 'express';
import { AppDataSource } from './data-source';
import { categoriaRoutes } from './routes/CategoriaRoutes';
import { produtoRoutes } from './routes/ProdutoRoutes';
import { entradaRoutes } from './routes/EntradaRoutes';
import { saidaRoutes } from './routes/SaidaRoutes';
import { authenticationRoutes } from './routes/AuthenticationRoutes';

AppDataSource.initialize().then(() => {
   const app = express();

   app.use(express.json());

   app.use('/api/authentication', authenticationRoutes);
   app.use('/api/categoria', categoriaRoutes);
   app.use('/api/produto', produtoRoutes);
   app.use('/api/entrada', entradaRoutes);
   app.use('/api/saida', saidaRoutes);

   return app.listen(process.env.PORT);
});