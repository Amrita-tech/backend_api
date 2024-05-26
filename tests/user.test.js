const request = require('supertest');
const app = require('../app');
const User = require('../models/User');


describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'Amrita', password: 'password123' });

      
     expect(response.statusCode).toBe(201);
    
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'Amrita', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');

    // Use the token from the .env.test file
    const token = process.env.TEST_ACCESS_TOKEN;
    console.log('Token from env:', token);

    // Optionally, you can make an authenticated request using the token
    const authResponse = await request(app)
      .get('/api/some-protected-route')
      .set('Authorization', `Bearer ${token}`);

    expect(authResponse.statusCode).toBe(200);
  });
});
