import request from 'supertest';
import app from '../../../app';

jest.mock('firebase-admin');

describe('Orders controller tests', () => {
  it('should edit the order with the supplied id', async () => {
    const response = await request(app).put('/orders/order-id');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'Order update successful',
      status: true,
    });
  });
});
