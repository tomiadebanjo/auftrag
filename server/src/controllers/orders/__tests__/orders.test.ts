import request from 'supertest';
import app from '../../../app';

jest.mock('firebase-admin');

describe('Orders controller tests', () => {
  it('should edit the order with the supplied id', async () => {
    const response = await request(app)
      .put('/orders/order-id')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer token')
      .send({ title: 'Update title', bookingDate: '1554284950023' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'Order update successful',
      status: true,
    });
  });

  it('should get the order with the supplied id', async () => {
    const response = await request(app)
      .get('/orders/order-id')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer token');

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Order retrieved');
    expect(response.body.status).toEqual(true);
  });

  it('should create an order', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        address: {
          city: 'mock city',
          country: 'mock country',
          street: 'mock street',
          zip: 'mock zip',
        },
        bookingDate: 1554284950023,
        customer: {
          email: 'mockemail@email.com',
          name: 'mock name',
          phone: 'mock phone',
        },
        title: 'Test Order 1',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer token');

    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual('Order creation successful');
    expect(response.body.status).toEqual(true);
  });
});
