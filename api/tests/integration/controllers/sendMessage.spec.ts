import request from 'supertest';
import { server } from '../../../index';
import User from '../../../models/User';
import Client from 'socket.io-client';
import ChatRoom from '../../../models/ChatRoom';
import { decrypt } from '../../../utils/encrypt';
import config from '../../../utils/config';

describe('PUT /api/send-message/:id', () => {
  const clearDB = async () => {
    await User.deleteMany({});
    await ChatRoom.deleteMany({});
  }

  beforeAll(() => clearDB());

  const exec = async (id: string, cookie: string, body:any) => {
    if (body.media)
      return request(server)
        .put(`/api/send-message/${id}`)
        .attach('media', body.media)
        .set('Cookie', cookie);
      else
      return request(server)
        .put(`/api/send-message/${id}`)
        .field('message', body.message)
        .set('Cookie', cookie);
  };

  let chatRoomId:string, sessionCookie:string, user1Id:string, user2Id:string;

  beforeEach(async () => {
    const user1 = new User({
      username: 'user1',
      email: 'user1@example.com',
      avatar: 'avatar1.jpg',
      avatarHex: '#123456',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user1.save();
    user1Id = user1._id.toString();

    const user2 = new User({
      username: 'user2',
      email: 'user2@example.com',
      avatar: 'avatar2.jpg',
      avatarHex: '#654321',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user2.save();
    user2Id = user2._id.toString();

    const chatRoom = new ChatRoom({
      members: [user1Id, user2Id]
    });
    await chatRoom.save();
    chatRoomId = chatRoom._id.toString();

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
    const fd = { message: 'Hello World!' };
    const res = await exec(chatRoomId, '', fd);
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with invalid token', async () => {
    const fd = { message: 'Hello World!' };
    const res = await exec(chatRoomId, 'connect.sid=A; Path=/; Expires=Wed, 21 Jun 2023 23:19:23 GMT; HttpOnly', fd);
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with expired token', async () => {
    const fd = { message: 'Hello World!' };
    const res = await exec(chatRoomId, 'connect.sid=s%3AGsiEJUCGLAK5TrNwfvFlMWZnsVQIVl4B.1J%2F5P8kn0sk%2BYZWZeMTqziDHo2xLf%2Fbe5HV2dMGeSWU;Domain=127.0.0.1; Path=/; Expires=Thu, 08 Jun 2023 18:23:59 GMT; HttpOnly; SameSite=None', fd);
    expect(res.status).toBe(401);
  });
  it('should return 400 if Chat Room ID is not a valid mongoose ID', async () => {
    const fd = { message: 'Hello World!' };
    const res = await exec('a', sessionCookie, fd);
    expect(res.status).toBe(400);
  });
  it('should return 400 if Chat Room ID is invalid ID', async () => {
    const fd = { message: 'Hello World!' };
    const res = await exec('64a6c9318d1abbf149654044', sessionCookie, fd);
    expect(res.status).toBe(400);
  });
  it('should return 400 if message is an empty string', async () => {
    const fd = { message: '' };
    const res = await exec(chatRoomId, sessionCookie, fd);
    expect(res.status).toBe(400);
  });
  it('should return 400 if message is longer than 512 chars', async () => {
    const fd = { message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' };
    const res = await exec(chatRoomId, sessionCookie, fd);
    expect(res.status).toBe(400);
  });
  it('should add encrypted message to the database when cookie is correct and message is in correct format', async () => {
    const fd = { message: 'Hello World!' };
    const res = await exec(chatRoomId, sessionCookie, fd);

    const chatRoom = await ChatRoom.findOne({ _id: chatRoomId, members: user1Id }).select('messages');

    expect(res.status).toBe(200);
    expect(chatRoom.messages[0].from.toString()).toBe(user1Id);
    expect(await decrypt(chatRoom.messages[0].message)).toBe('Hello World!');
  });
  it('should add message to the database when cookie is correct and media file is valid', async () => {
    const fd = { media: 'tests/components/test.gif' };
    const res = await exec(chatRoomId, sessionCookie, fd);

    const chatRoom = await ChatRoom.findOne({ _id: chatRoomId, members: user1Id }).select('messages');

    expect(res.status).toBe(200);
    expect(chatRoom.messages[0].from.toString()).toBe(user1Id);
    expect(chatRoom.messages[0].source).toBeDefined();
  });
  it('should return valid socket.io data when cookie is correct and message is a text', async () => {
    const fd = { message: 'Hello World!' };
    await exec(chatRoomId, sessionCookie, fd);
    const clientSocket = Client(`http://localhost:${config.PORT}`, {
      withCredentials: true
    });

    const chatRoom = await ChatRoom.findOne({ _id: chatRoomId, members: user1Id }).select('messages');

    clientSocket.on('connection', (data:any) => {
      expect(data).toBe(chatRoom.messages[0]);
    });
  });
  it('should return valid socket.io data when cookie is correct and message is media', async () => {
    const fd = { media: 'tests/components/test.gif' };
    await exec(chatRoomId, sessionCookie, fd);
    const clientSocket = Client(`http://localhost:${config.PORT}`, {
      withCredentials: true
    });

    const chatRoom = await ChatRoom.findOne({ _id: chatRoomId, members: user1Id }).select('messages');

    clientSocket.on('connection', (data:any) => {
      expect(data).toBe(chatRoom.messages[0]);
    });
  });
});
