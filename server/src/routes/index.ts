import express from 'express';
import ordersRouter from '../controllers/orders';

const routes = (app: express.Express): void => {
  app.use('/orders', ordersRouter);
};

export default routes;
