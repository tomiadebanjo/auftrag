import express from 'express';
import AuthMiddleware from '../../middleware/auth';
import OrdersController from './orders.controller';

const ordersRouter = express.Router();

ordersRouter.post(
  '/',
  AuthMiddleware.verifyTokenId,
  OrdersController.createOrder
);
ordersRouter.put('/:id', OrdersController.updateOrder);

export default ordersRouter;
