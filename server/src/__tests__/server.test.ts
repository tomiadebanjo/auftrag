import request from 'supertest';
import app from '../app';

jest.mock('firebase-admin');

describe('Server Endpoint tests', () => {
  it('should return the welcome response', async () => {
    const response = await request(app).get('/');

    expect(response.body).toEqual({
      message: 'Welcome to Auftrag API!',
      status: true,
    });
    expect(response.status).toEqual(200);
  });

  it('should return a 404 error when a route does not exist', async () => {
    const response = await request(app).get('/route-that-does-not-exist');

    expect(response.body).toEqual({
      message: 'Route not found!',
      status: false,
    });
    expect(response.status).toEqual(404);
  });
});
