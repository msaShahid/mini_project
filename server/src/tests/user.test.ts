import request from 'supertest';
import { connectTestDB, clearTestDB, closeTestDB } from './setupTestDB';
import { app } from '../server';

let token: string;
let taskId: string;

beforeAll(async () => {
    await connectTestDB();
});

afterEach(async () => {
    await clearTestDB();
});

afterAll(async () => {
    await closeTestDB();
});

describe('🧪 MERN API Tests (Real MongoDB)', () => {
    const user = {
        name: 'doe',
        email: 'doe@example.com',
        password: 'password123',
    };


    const registerAndLogin = async () => {

        await request(app).post('/api/users/register').send(user);

        const loginRes = await request(app)
            .post('/api/users/login')
            .send({ email: user.email, password: user.password });

        if (!loginRes.body.data?.token) {
            throw new Error('Login failed in test helper');
        }

        return loginRes.body.data.token;
    };

    it('should register a user', async () => {
        const res = await request(app).post('/api/users/register').send(user);
        expect(res.status).toBe(201);
        expect(res.body.message).toMatch(/registered/i);
    });

    it('should log in and return a token', async () => {
        token = await registerAndLogin();
        expect(token).toBeDefined();
    });

    it('should return profile data with valid token', async () => {
        token = await registerAndLogin();
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.email).toBe(user.email);
    });

    it('should fail to access profile without token', async () => {
        const res = await request(app).get('/api/users/profile');
        expect(res.status).toBe(401);
    });
});
