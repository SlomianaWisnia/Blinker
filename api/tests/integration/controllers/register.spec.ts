import request from 'supertest';
import { server } from '../../../index';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

describe('POST /api/register', () => {
  const clearDB = async () => await User.deleteMany({});

  beforeAll(() => clearDB());

  const exec = async (body:Object) => {
    return request(server)
      .post('/api/register')
      .send(body);
  };

  afterEach(() => clearDB());
  afterAll(async () => {
    await server.close();
  });

  // Valid input data

  it('should return 200 when user gives valid username, email and password', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: '12345678' });
    expect(res.status).toBe(200);
  });
  it('should return 200 when user gives maximum length but valid username, email and password', async () => {
    const res = await exec({
      username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@vp.pl',
      password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
     });
    expect(res.status).toBe(200);
  });
  it('should return connect.sid cookie when user gives valid username, email and password', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: '12345678' });
    expect(res.headers['set-cookie'][0]).toContain('connect.sid=');
  });
  it('should save user to the database when user gives valid username, email and password', async () => {
    const username = 'TestUser';
    const email = 'b@vp.pl';
    const password = '12345678';
    const res = await exec({ username, email, password });

    const result = await User.findOne({ username, email });

    expect(result.username).toEqual(username);
    expect(result.email).toEqual(email);
    expect(result.avatarHex).toBeDefined();
    
    const validatePassword = await bcrypt.compare(password, result.password);
    expect(validatePassword).toBeTruthy();
  });

  // Invalid input data

  it('should return 400 when user gives no username', async () => {
    const res = await exec({ email: 'b@vp.pl', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when user gives no email', async () => {
    const res = await exec({ username: 'TestUser', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when user gives no password', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when user gives an empty object', async () => {
    const res = await exec({});
    expect(res.status).toBe(400);
  });
  it('should return 400 when user gives no object', async () => {
    const res = await request(server).post('/api/register');
    expect(res.status).toBe(400);
  });
  it('should return 400 when username is not a string type', async () => {
    const res = await exec({ username: {}, email: 'b@vp.pl', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when email is not a string type', async () => {
    const res = await exec({ username: 'TestUser', email: {}, password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when email is not a valid email', async () => {
    const res = await exec({ username: 'TestUser', email: 'aaaaa', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when password is not a string type', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: {} });
    expect(res.status).toBe(400);
  });
  it('should return 400 when username length is less than 5 characters', async () => {
    const res = await exec({ username: 'test', email: 'b@vp.pl', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when username length is more than 50 characters', async () => {
    const res = await exec({ username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', email: 'b@vp.pl', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when email length is less than 5 characters', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when email length is more than 70 characters', async () => {
    const res = await exec({ username: 'TestUser', email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@vp.pl', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when password length is less than 8 characters', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: '1234567' });
    expect(res.status).toBe(400);
  });
  it('should return 400 when password length is more than 70 characters', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' });
    expect(res.status).toBe(400);
  });

  // User is already registered

  it('should return 400 when username is already taken', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: '12345678' });
    const res2 = await exec({ username: 'TestUser', email: 'c@vp.pl', password: '12345678' });
    expect(res2.status).toBe(400);
  });
  it('should return 400 when email is already taken', async () => {
    const res = await exec({ username: 'TestUser', email: 'b@vp.pl', password: '12345678' });
    const res2 = await exec({ username: 'TestUser1', email: 'b@vp.pl', password: '12345678' });
    expect(res2.status).toBe(400);
  });

});