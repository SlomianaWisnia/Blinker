import request from 'supertest';
import server from '../../../index';
import User from '../../../models/User';

describe('POST /api/auth-verify', () => {
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
      avatarHex: '#000000',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    const { _id } = await user.save();

    const user2 = new User({
      username: 'Test2',
      email: 'b@vp.pl',
      friends: [_id],
      avatarHex: '#000000',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    const res2 = await user2.save();

    const user3 = new User({
      username: 'Test3',
      email: 'c@vp.pl',
      friends: [_id, res2._id],
      avatarHex: '#000000',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user3.save();
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
  it('should return valid data in user object if user has a valid connect.sid cookie with session', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test1',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);
    expect(res.body.data.user.username).toEqual('Test1');
    expect(res.body.data.user.email).toEqual('a@vp.pl');
    expect(res.body.data.user.avatar).toEqual('example.jpg');
    expect(res.body.data.user).toHaveProperty('avatarHex');
  });
  it('should return valid data in friends object if user has a valid connect.sid cookie with session and friends', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test3',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);
    expect(res.body.data.friends[0].username).toEqual('Test1');
    expect(res.body.data.friends[0].avatar).toEqual('example.jpg');
    expect(res.body.data.friends[0]).toHaveProperty('avatarHex');
    expect(res.body.data.friends[1].username).toEqual('Test2');
    expect(res.body.data.friends[1]).toHaveProperty('avatarHex');
  });
});