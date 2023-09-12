import request from 'supertest';
import { server } from '../../../index';
import fs from 'fs-extra';
import User from '../../../models/User';
import dotenv from 'dotenv';
dotenv.config({ path: `../../config/${process.env.NODE_ENV}.env` });

describe('PUT /api/user/update-avatar', () => {
  const clearDB = async () => {
    await User.deleteMany({});
  }

  beforeAll(() => clearDB());

  const exec = async (cookie: string, body:any) => {
    return request(server)
      .put('/api/user/update-avatar')
      .attach('avatar', body.media)
      .set('Cookie', cookie);
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
  it('should return 400 if cookie is valid but media is not defined', async () => {
    const res = await exec(sessionCookie, '');
    expect(res.status).toBe(400);
  });
  it('should return 400 if cookie is valid but media is unsupported file type', async () => {
    const fd = { media: 'tests/components/test.txt' };
    const res = await exec(sessionCookie, fd);

    expect(res.status).toBe(400);
  });
  it('should update avatar if cookie and media are valid', async () => {
    const fd = { media: 'tests/components/test.gif' };
    const res = await exec(sessionCookie, fd);

    const user = await User.findOne({ username: 'user1' }).select('username avatar');

    expect(res.status).toBe(200);
    expect(user.avatar).toMatch(/\.gif/);
    expect(fs.existsSync(`./media/users/${user.username}/avatar/${user.avatar}`)).toBeTruthy();
  });
});
