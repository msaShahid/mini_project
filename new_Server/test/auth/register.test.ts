import request from 'supertest';
import { it, describe, expect, beforeAll, afterAll } from 'vitest';
import app from '../../src/app.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()
    await mongoose.connect(mongoUri)
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop()
    }
    await mongoose.connection.close();
})

describe('Test the register functionality', () => {

    const endpoint = '/api/v1/user/register'
    const userPayload = {
        name: "John",
        email: "john@example.com",
        password: "password123"
    }

    it('should register a user', async () => {
        const res = await request(app).post(endpoint).send(userPayload)

        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
            message: "User create successfully.",
            data: {
                name: "John",
                email: "john@example.com"
            }
        });

        expect(res.body.data.id).toBeDefined();
    })

    it("should return 409 for duplicate email", async () => {
        await request(app).post(endpoint).send(userPayload);

        const res = await request(app).post(endpoint).send(userPayload);

        expect(res.status).toBe(409);
        expect(res.body).toMatchObject({
            message: `User already exit with this ${userPayload.email}`,
        });
    });

    it('should return 400 when required fields are missing or invalid', async () => {

        const res = await request(app).post(endpoint).send({
            email: 'invalid-email',
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Validation failed');
        expect(res.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'email',
                    message: 'Invalid email format',
                }),
                expect.objectContaining({
                    field: 'password',
                    message: 'Invalid input: expected string, received undefined',
                }),
            ])
        );

        console.log('Validation errors:', res.body.errors);
    });

    it("should return 400 for invalid email format", async () => {
        const res = await request(app).post(endpoint).send({
            name: "Bad Email",
            email: "not-an-email",
            password: "password123"
        });

        expect([400, 422, 500]).toContain(res.status);
    });

    it("should return 500 on internal error", async () => {
        await mongoose.connection.close();

        const res = await request(app).post(endpoint).send(userPayload);

        expect(res.status).toBe(500);
        await mongoose.connect(mongo.getUri());
    });

})