import request from 'supertest';
import server from '../../../index';
import User from '../../../models/User';
import ChatRoom from '../../../models/ChatRoom';

describe('GET /api/get-last-messages', () => {
  const clearDB = async () => {
    await User.deleteMany({});
    await ChatRoom.deleteMany({});
  }

  beforeAll(() => clearDB());

  const exec = async (cookie: string) => {
    return request(server)
      .get('/api/get-last-messages')
      .set('Cookie', cookie)
      .send();
  };

  const id = [];

  beforeEach(async () => {
    const user = new User({
      username: 'Test1',
      email: 'a@vp.pl',
      avatar: 'example.jpg',
      avatarHex: '#000000',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    const { _id } = await user.save();

    id.push(_id);

    const user2 = new User({
      username: 'Test2',
      email: 'b@vp.pl',
      friends: [_id],
      avatarHex: '#000000',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    const res2 = await user2.save();

    id.push(res2._id);

    await new User({
      username: 'Test3',
      email: 'c@vp.pl',
      avatarHex: '#000000',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    }).save();

    await new ChatRoom({
      members: [_id, res2._id],
      messages:[
        {
          from: _id,
          message: 'Hello World!'
        },
        {
          from: _id,
          message: 'Last Message'
        }
      ]
    }).save();

    await new ChatRoom({
      members: [_id, res2._id],
      messages:[
        {
          from: _id,
          source: 'test.mp3'
        },
      ]
    }).save();

    await new ChatRoom({
      members: [_id, res2._id]
    }).save();
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
  it('should return valid data in user object if user has a valid connect.sid cookie with session and message is text', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test1',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);

    const users = await User.find({ _id: id }).select('username avatar');
    expect(res.body.chats[0]).toHaveProperty('_id');
    expect(res.body.chats[0].members[0]).toMatchObject({
      username: users[0].username,
      avatar: users[0].avatar
    });
    expect(res.body.chats[0].messages[0]).toHaveProperty('_id');
    expect(res.body.chats[0].messages[0]).toHaveProperty('created');
    expect(res.body.chats[0].messages[0]).toMatchObject({
      from: {
        username: users[0].username,
        avatar: users[0].avatar
      },
      message: 'Last Message'
    });
  });
  it('should return valid data in user object if user has a valid connect.sid cookie with session and message is source', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test1',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);

    const users = await User.find({ _id: id }).select('username avatar');
    expect(res.body.chats[1]).toHaveProperty('_id');
    expect(res.body.chats[1].members[0]).toMatchObject({
      username: users[0].username,
      avatar: users[0].avatar
    });
    expect(res.body.chats[1].messages[0]).toHaveProperty('_id');
    expect(res.body.chats[1].messages[0]).toHaveProperty('created');
    expect(res.body.chats[1].messages[0]).toMatchObject({
      from: {
        username: users[0].username,
        avatar: users[0].avatar
      },
      source: 'test.mp3'
    });
  });
  it('should return valid data in user object if user has a valid connect.sid cookie with session and there is no messages', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test1',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);

    const users = await User.find({ _id: id }).select('username avatar');
    expect(res.body.chats[2]).toHaveProperty('_id');
    expect(res.body.chats[2].members[0]).toMatchObject({
      username: users[0].username,
      avatar: users[0].avatar
    });
    expect(res.body.chats[2].messages).toEqual([]);
  });
  it('should return valid data in user object if user has a valid connect.sid cookie with session and is not in any ChatRoom', async () => {
    const tokenRes = await request(server).post('/api/auth').send({
      username: 'Test3',
      password: '12345678'
    });

    const token = tokenRes.headers['set-cookie'][0];
    const res = await exec(token);

    expect(res.body.chats).toEqual([]);
  });
});