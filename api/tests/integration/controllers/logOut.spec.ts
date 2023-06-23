import request from 'supertest';
import server from '../../../index';
import User from '../../../models/User';

describe('POST /api/logout', () => {
  const clearDB = async () => await User.deleteMany({});

  beforeAll(() => clearDB());

  const exec = async (cookie: string) => {
    return request(server)
      .post('/api/logout')
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

  it('should return 400 if there is no connect.sid cookie', async () => {
    const res = await exec('');
    expect(res.status).toBe(400);
  });
  it('should return 200 and log out user if there is a connect.sid cookie', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test1',
      password: '12345678'
    });
    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);

    const verifyRes = await request(server).post('/api/auth').set('Cookie', token).send();

    expect(res.status).toBe(200);
    expect(verifyRes.status).not.toBe(200);
  });
});