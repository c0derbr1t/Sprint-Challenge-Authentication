require('dotenv').config();
const request = require("supertest");
const server = require("../api/server.js");
const db = require('../database/dbConfig.js');
const Users = require('./auth-model.js');

describe('router', function() {
    describe('environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.NODE_ENV).toBe('testing');
        });
    });

    // describe('clear tables', function() {
    //     beforeEach(async function() {
    //         await db('users').truncate();
    //     });
    // });

    describe('POST /api/register', function() {
        beforeEach(async function() {
            await db('users').truncate();
        });
        // afterEach(async function() {
        //     await db('users').truncate();
        // });

        it('should add the new user', function() {
            const payload = { username: "Elmo", password: "giggles" }
            return request(server).post('/api/auth/register').send(payload).then(res => {
                expect(res.body.user.username).toBe('Elmo');
            });
        });

        it('should return a status code 201', function() {
            const payload = { username: "Elmo", password: "giggles" };
            return request(server).post('/api/auth/register').send(payload).then(res => {
                expect(res.status).toBe(201);
            });
        });
    });
});