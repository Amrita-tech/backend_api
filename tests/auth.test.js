const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Authentication Routes', () => {
    it('should register a new user and return a JWT token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'password123' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');

        // Store the token for later use
        token = res.body.token;
    });

});

