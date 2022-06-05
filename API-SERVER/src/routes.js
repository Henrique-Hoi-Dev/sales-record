import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import UserController from './app/controller/UserController';

import ProductController from './app/controller/ProductController';
import FileController from './app/controller/FileController';
import OrderController from './app/controller/OrderController';
import AdressController from './app/controller/AdressController';
import ServiceController from './app/controller/ServiceController';
import FinancialBoxController from './app/controller/FinancialBoxController';
import CardController from './app/controller/CardController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//cadastro
routes.post('/users/register', UserController.store);
routes.post('/users/authenticate', SessionController.storeSession);
routes.get('/card', CardController.index)

//autenticação
routes.use(authMiddleware);

//users
routes.put('/user/:id', UserController.update)
      .get('/users', UserController.index)
      .get('/user/:id', UserController.getId)
      .delete('/user/:id', UserController.delete);

//adress 
routes.post('/adress/:user_id', AdressController.store)
      .put('/adress/:id', AdressController.update)
      .get('/adress/:id', AdressController.getId)
      .delete('/adress/:id', AdressController.delete);

//avatar
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/avatar', FileController.getId);
routes.delete('/avatar/:id', FileController.delete);

//products
routes.post('/product', ProductController.store)
      .post('/product/avatar', ProductController.update)
      .put('/product/:id', ProductController.update)
      .get('/products', ProductController.index)
      .get('/product/:id', ProductController.getId)
      .delete('/product/:id', ProductController.delete);

//order
routes.post('/sales', OrderController.store)
      .post('/sales/:id', OrderController.store)
      .get('/saleses/:id', OrderController.index)
      .get('/sales/:id', OrderController.getId)
      .delete('/sales/:id', OrderController.delete);

//services
routes.post('/service/:id', ServiceController.store)
      .get('/services/:id', ServiceController.index)
      .get('/service/:id', ServiceController.getId)
      .delete('/service/:id', ServiceController.delete)

//financialBox 
routes.post('/financialBox/:user_id', FinancialBoxController.store)
      .put('/financialBox/:id', FinancialBoxController.update)
      .get('/financialBoxs/:id', FinancialBoxController.index)
      .get('/financialBoxsOpen/:id', FinancialBoxController.open)
      .get('/financialBox/:id', FinancialBoxController.getId)

export default routes;
