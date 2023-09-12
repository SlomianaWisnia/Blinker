import request from 'supertest';
import { server } from '../../../index';
import fs from 'fs-extra';
import User from '../../../models/User';
import ChatRoom from '../../../models/ChatRoom';

describe('GET /api/get-chat-media/:id/:source', () => {
  let chatRoomId:string, sessionCookie:string, user1Id:string, user2Id:string, user3Id:string, mediaSource: string;
  const media = 'tests/components/test.gif';

  const exec = async (cookie: string, id:any, source:any) => {
    return request(server)
      .get(`/api/get-chat-media/${id}/${source}`)
      .set('Cookie', cookie)
      .send();
  };

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
    
    const user3 = new User({
      username: 'user3',
      email: 'user3@example.com',
      avatar: 'avatar2.jpg',
      avatarHex: '#654321',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user3.save();
    user3Id = user3._id.toString();

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

    await request(server)
      .put(`/api/send-message/${chatRoomId}`)
      .set('Cookie', sessionCookie)
      .attach('media', media);

    const room = await ChatRoom.findOne({ _id: chatRoomId }).select('messages');
    mediaSource = room.messages.pop().source;
  });

  afterEach(async () => {
    await ChatRoom.deleteMany();
    await User.deleteMany();
  });

  afterAll(() => {
    server.close();
  });

  it('should return 401 if there is no connect.sid cookie', async () => {
    const res = await exec('', chatRoomId, mediaSource);
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with invalid token', async () => {
    const res = await exec('connect.sid=A; Path=/; Expires=Wed, 21 Jun 2023 23:19:23 GMT; HttpOnly', chatRoomId, mediaSource);
    expect(res.status).toBe(401);
  });
  it('should return 401 if there is a connect.sid cookie with expired token', async () => {
    const res = await exec('connect.sid=s%3AGsiEJUCGLAK5TrNwfvFlMWZnsVQIVl4B.1J%2F5P8kn0sk%2BYZWZeMTqziDHo2xLf%2Fbe5HV2dMGeSWU;Domain=127.0.0.1; Path=/; Expires=Thu, 08 Jun 2023 18:23:59 GMT; HttpOnly; SameSite=None', chatRoomId, mediaSource);
    expect(res.status).toBe(401);
  });
  it('should return 404 if id is not provided', async () => {
    const res = await exec(sessionCookie, '', mediaSource);
    expect(res.status).toBe(404);
  });
  it('should return 404 if source not provided', async () => {
    const res = await exec(sessionCookie, chatRoomId, '');
    expect(res.status).toBe(404);
  });
  it('should return 400 if id is not string type', async () => {
    const res = await exec(sessionCookie, {}, mediaSource);
    expect(res.status).toBe(400);
  });
  it('should return 400 if id is not a valid ObjectId', async () => {
    const res = await exec(sessionCookie, 'test', mediaSource);
    expect(res.status).toBe(400);
  });
  it('should return 404 if source is not string type', async () => {
    const res = await exec(sessionCookie, chatRoomId, {});
    expect(res.status).toBe(404);
  });
  it('should return 404 if source is not a valid name', async () => {
    const res = await exec(sessionCookie, chatRoomId, 'aaa');
    expect(res.status).toBe(404);
  });
  it('should return 404 if user is not in that chatroom', async () => {
    const authResponse = await request(server)
      .post('/api/auth')
      .send({
        username: 'user3',
        password: '12345678'
      });

    const session = authResponse.headers['set-cookie'][0];

    const res = await exec(session, chatRoomId, mediaSource);
    expect(res.status).toBe(404);
  });
  it('should return 200 if cookie, chatroom id and source are valid', async () => {
    const res = await exec(sessionCookie, chatRoomId, mediaSource);

    expect(res.status).toBe(200);
    expect(fs.existsSync(`media/chats/${chatRoomId}/${mediaSource}`)).toBeTruthy();
  });
});