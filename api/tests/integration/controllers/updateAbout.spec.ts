import request from 'supertest';
import { server } from '../../../index';
import User from '../../../models/User';

describe('PUT /api/user/update-about', () => {
  const clearDB = async () => {
    await User.deleteMany({});
  }

  beforeAll(() => clearDB());

  const exec = async (cookie: string, body:any) => {
    return request(server)
      .put('/api/user/update-about')
      .set('Cookie', cookie)
      .send(body);
  };

  let sessionCookie:string;

  beforeEach(async () => {
    const user1 = new User({
      username: 'user1',
      email: 'user1@example.com',
      avatarHex: '#123456',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user1.save();

    const authResponse = await request(server)
      .post('/api/auth')
      .send({
        username: 'user1',
        password: '12345678'
      });

    sessionCookie = authResponse.headers['set-cookie'][0];
  });

  afterEach(() => clearDB());
  afterAll(() => {
    server.close();
  });

  it('should return 401 if there is no connect.sid cookie', async () => {
    const res = await exec('', '');
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with invalid token', async () => {
    const res = await exec('connect.sid=A; Path=/; Expires=Wed, 21 Jun 2023 23:19:23 GMT; HttpOnly', '');
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with expired token', async () => {
    const res = await exec('connect.sid=s%3AGsiEJUCGLAK5TrNwfvFlMWZnsVQIVl4B.1J%2F5P8kn0sk%2BYZWZeMTqziDHo2xLf%2Fbe5HV2dMGeSWU;Domain=127.0.0.1; Path=/; Expires=Thu, 08 Jun 2023 18:23:59 GMT; HttpOnly; SameSite=None', '');
    expect(res.status).toBe(401);
  });
  it('should return 400 if cookie is valid but body is not defined', async () => {
    const res = await exec(sessionCookie, '');
    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but emoji is not defined', async () => {
    const res = await exec(sessionCookie, { about: { bio: 'Hello World!' } });

    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but bio is not defined', async () => {
    const res = await exec(sessionCookie, { about: { emoji: '😋' } });

    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but emoji is an empty string', async () => {
    const res = await exec(sessionCookie, { about: { emoji: '', bio: 'Hello World!' } });

    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but bio is an empty string', async () => {
    const res = await exec(sessionCookie, { about: { emoji: '😋', bio: '' } });

    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but emoji is 2 chars long', async () => {
    const res = await exec(sessionCookie, { about: { emoji: '😋😋', bio: 'Hello World!' } });

    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but bio is 257 chars long', async () => {
    const res = await exec(sessionCookie, { about: { emoji: '😋', bio: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' } });

    expect(res.status).toBe(400);
  });
  it('should update about if cookie and about object are valid', async () => {
    const res = await exec(sessionCookie, { about: { emoji: '😋', bio: 'Hello World!' } });

    expect(res.status).toBe(200);

    const user = await User.findOne({ username: 'user1' });
    expect(user.about.emoji).toBe('😋');
    expect(user.about.bio).toBe('Hello World!');
  });
});
