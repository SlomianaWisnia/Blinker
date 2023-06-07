import request from 'supertest';
import server from '../../../index';
import User from '../../../models/User';

describe('POST /api/auth', () => {
  const clearDB = async () => await User.deleteMany({});

  beforeAll(() => clearDB());

  const exec = async (body:Object) => {
    return request(server)
      .post('/api/auth')
      .send(body);
  };

  beforeEach(async () => {
    const user = new User({ username: 'Test1', email: 'a@vp.pl', password: '$2b$15$B4Lr9qSun4U6wgM0865gV.5iFs8mcbDonPQwN4F3BEmWNFcbVocu.' });
    await user.save();
  });

  afterEach(() => clearDB());
  afterAll(async () => {
    await server.close();
  });

  // Valid credentials

  it('should return 200 if user gave correct username and password', async () => {
    const res = await exec({ username: 'Test1', password: '12345678' });
    expect(res.status).toBe(200);
  });
  it('should return 200 if user gave correct email and password', async () => {
    const res = await exec({ username: 'a@vp.pl', password: '12345678' });
    expect(res.status).toBe(200);
  });
  it('should return connect.sid cookie if user gave correct username and password', async () => {
    const res = await exec({ username: 'Test1', password: '12345678' });
    expect(res.headers['set-cookie'][0]).toContain('connect.sid=');
  });
  it('should return connect.sid cookie if user gave correct email and password', async () => {
    const res = await exec({ username: 'a@vp.pl', password: '12345678' });
    expect(res.headers['set-cookie'][0]).toContain('connect.sid=');
  });

  // Invalid credentials

  it('should return 400 if user gave invalid username', async () => {
    const res = await exec({ username: 'Test2', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if user gave invalid password', async () => {
    const res = await exec({ username: 'Test1', password: '1' });
    expect(res.status).toBe(400);
  });

  // Invalid types of data or invalid length

  it('should return 400 if no username given', async () => {
    const res = await exec({ password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if no password given', async () => {
    const res = await exec({ username: 'Test1' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if username is not a string type', async () => {
    const res = await exec({ username: {}, password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if password is not a string type', async () => {
    const res = await exec({ username: 'Test1', password: {} });
    expect(res.status).toBe(400);
  });
  it('should return 400 if username is less than 5 characters', async () => {
    const res = await exec({ username: 'Test', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if password is less than 8 characters', async () => {
    const res = await exec({ username: 'Test1', password: '1234567' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if username is longer than 70 characters', async () => {
    const res = await exec({ username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if password is longer than 70 characters', async () => {
    const res = await exec({ username: 'Test1', password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' });
    expect(res.status).toBe(400);
  });
});