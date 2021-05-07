import express from 'express';
import OrdersController from './orders.controller';

const ordersRouter = express.Router();

ordersRouter.post('/', OrdersController.updateOrders);
ordersRouter.put('/:id', OrdersController.updateOrders);

export default ordersRouter;
