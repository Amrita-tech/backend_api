const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Preference = require('../models/Preference');

let token;

beforeAll(async () => {
    const user = new User({ username: 'testuser', password: 'password123' });
    await user.save();

    token = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'password123' })
        .then((res) => res.body.token);
});

describe('Preference Routes', () => {
    it('should get user preferences', async () => {
        const res = await request(app)
            .get('/api/preference')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('themeColor');
    });

    it('should set user preferences', async () => {
        const res = await request(app)
            .post('/api/preference')
            .set('Authorization', `Bearer ${token}`)
            .send({ themeColor: 'red' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('themeColor', 'red');
    });
});

