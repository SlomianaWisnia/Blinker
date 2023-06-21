import request from 'supertest';
import server from '../../../index';
import User from '../../../models/User';

describe('Authorization Middleware', () => {
  const clearDB = async () => await User.deleteMany({});

  beforeAll(() => clearDB());

  const exec = async (cookie: string) => {
    return request(server)
      .post('/api/auth-verify')
      .set('Cookie', cookie)
      .send();
  };

  beforeEach(async () => {
    const user = new User({
      username: 'Test1',
      email: 'a@vp.pl',
      avatar: 'example.jpg',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user.save();
  });

  afterEach(() => clearDB());
  afterAll(async () => {
    await server.close();
  });

  it('should return 401 if there is no connect.sid cookie', async () => {
    const res = await exec('');
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with invalid token', async () => {
    const res = await exec('connect.sid=A; Path=/; Expires=Wed, 21 Jun 2023 23:19:23 GMT; HttpOnly');
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with expired token', async () => {
    const res = await exec('connect.sid=s%3AGsiEJUCGLAK5TrNwfvFlMWZnsVQIVl4B.1J%2F5P8kn0sk%2BYZWZeMTqziDHo2xLf%2Fbe5HV2dMGeSWU;Domain=127.0.0.1; Path=/; Expires=Thu, 08 Jun 2023 18:23:59 GMT; HttpOnly; SameSite=None');
    expect(res.status).toBe(401);
  });
  it('should return 200 if user has a valid connect.sid cookie with session', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test1',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);
    expect(res.status).toBe(200);
  });
});