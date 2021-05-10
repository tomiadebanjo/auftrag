import express from 'express';
import AuthMiddleware from '../../middleware/auth';
import InputValidator from '../../middleware/inputValidator';
import OrdersController from './orders.controller';

const ordersRouter = express.Router();

ordersRouter.post(
  '/',
  AuthMiddleware.verifyTokenId,
  InputValidator.createOrder(),
  OrdersController.createOrder
);
ordersRouter.put(
  '/:id',
  AuthMiddleware.verifyTokenId,
  InputValidator.updateOrder(),
  OrdersController.updateOrder
);
ordersRouter.get(
  '/:id',
  AuthMiddleware.verifyTokenId,
  InputValidator.getOrder(),
  OrdersController.getOrder
);

export default ordersRouter;
