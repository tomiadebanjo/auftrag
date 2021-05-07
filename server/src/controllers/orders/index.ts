import express from 'express';
import OrdersController from './orders.controller';

const ordersRouter = express.Router();

ordersRouter.post('/', OrdersController.createOrder);
ordersRouter.put('/:id', OrdersController.updateOrder);

export default ordersRouter;
