import request from 'supertest';
import { server } from '../../../index';
import User from '../../../models/User';
import ChatRoom from '../../../models/ChatRoom';

describe('POST /api/add-friend', () => {
  const clearDB = async () => {
    await User.deleteMany({});
    await ChatRoom.deleteMany({});
  }

  beforeAll(() => clearDB());

  const exec = async (cookie:string, username: any) => {
    return request(server)
      .post('/api/add-friend')
      .set('Cookie', cookie)
      .send({ username });
  };

  const id:any[] = [];
  let sessionCookie:string;

  beforeEach(async () => {
    const users:any[] = [];

    users.push(new User({
      username: 'user1',
      email: 'user1@example.com',
      avatar: 'test.png',
      about: { emoji: '😋', bio: 'Test' },
      avatarHex: '#123456',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    }));
    
    users.push(new User({
      username: 'user2',
      email: 'user2@example.com',
      avatarHex: '#123456',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    }));

    users.forEach(async (user) => {
      const { _id } = await user.save();
      id.push(_id);
    });

    const res = await request(server).post('/api/auth').send({ username: 'user1', password: '12345678' });
    sessionCookie = res.headers['set-cookie'][0];
  });

  afterEach(() => clearDB());
  afterAll(() => {
    server.close();
  });

  it('should return 401 if there is no connect.sid cookie', async () => {
    const res = await exec('', 'user2');
    expect(res.status).toBe(401);
  });
  
  it('should return 401 if there is a connect.sid cookie with invalid token', async () => {
    const res = await exec('connect.sid=A; Path=/; Expires=Wed, 21 Jun 2023 23:19:23 GMT; HttpOnly', 'user2');
    expect(res.status).toBe(401);
  });
  
  it('should return 401 if there is a connect.sid cookie with expired token', async () => {
    const res = await exec('connect.sid=s%3AGsiEJUCGLAK5TrNwfvFlMWZnsVQIVl4B.1J%2F5P8kn0sk%2BYZWZeMTqziDHo2xLf%2Fbe5HV2dMGeSWU;Domain=127.0.0.1; Path=/; Expires=Thu, 08 Jun 2023 18:23:59 GMT; HttpOnly; SameSite=None', 'user2');
    expect(res.status).toBe(401);
  });

  it('should return 400 if username is not a string type', async () => {
    const res = await exec(sessionCookie, { test: 'No throw pls ;)' });
    expect(res.status).toBe(400);
  });
  
  it('should return 400 if username is longer than 70 chars', async () => {
    const res = await exec(sessionCookie, Array(72).join('a'));
    expect(res.status).toBe(400);
  });

  it('should return 400 when there is no user with the given username', async () => {
    const res = await exec(sessionCookie, 'DiffentUser');
    expect(res.status).toBe(400);
  });

  it('should add user to the list of friends', async () => {
    const res = await exec(sessionCookie, 'user2');
    expect(res.status).toBe(200);
  });
  
  it('should return 400 when friend is already added', async () => {
    const res = await exec(sessionCookie, 'user2');
    expect(res.status).toBe(200);

    const res2 = await exec(sessionCookie, 'user2');
    expect(res2.status).toBe(400);
  });

  it('should create one chat with the new friend', async () => {
    const res = await exec(sessionCookie, 'user2');
    expect(res.status).toBe(200);

    const chatroom = await ChatRoom.find({ members: [id[0], id[1]] });
    expect(chatroom.length).toBe(1);
  });
});
