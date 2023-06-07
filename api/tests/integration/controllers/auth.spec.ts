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
    const user = new User({ username: 'Test1', email: 'a@vp.pl', password: '12345678' });
    await user.save();
  });

  afterEach(() => clearDB());
  afterAll(async () => {
    await server.close();
  });

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
  it('should return 400 if no username given', async () => {
    const res = await exec({ password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if no password given', async () => {
    const res = await exec({ username: 'Test1' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if user gave invalid username', async () => {
    const res = await exec({ username: 'Test2', password: '12345678' });
    expect(res.status).toBe(400);
  });
  it('should return 400 if user gave invalid password', async () => {
    const res = await exec({ username: 'Test1', password: '1' });
    expect(res.status).toBe(400);
  });
});