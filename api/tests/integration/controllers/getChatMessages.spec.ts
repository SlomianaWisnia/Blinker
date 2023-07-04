import request from 'supertest';
import server from '../../../index';
import User from '../../../models/User';
import ChatRoom from '../../../models/ChatRoom';
import mongoose from 'mongoose';

describe('GET /api/messages/:id/:start/:limit', () => {
  let chatRoomId:string, sessionCookie:string, user1Id:string, user2Id:string, user3Id:string, chatRoom2Id:string;

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
    
    const chatRoom2 = new ChatRoom({
      members: [user1Id, user2Id]
    });
    for (let i = 0; i <= 4; i++) {
      chatRoom2.messages.push({
        // @ts-ignore
        from: user1Id,
        message: `${i}`
      });
    }
    await chatRoom2.save();
    chatRoom2Id = chatRoom2._id.toString();
    
    const user3 = new User({
      username: 'user3',
      email: 'user3@example.com',
      avatar: 'avatar2.jpg',
      avatarHex: '#654321',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    });
    await user3.save();
    user3Id = user3._id.toString();

    const authResponse = await request(server)
      .post('/api/auth')
      .send({
        username: 'user1',
        password: '12345678'
      });

    sessionCookie = authResponse.headers['set-cookie'][0];
  });

  afterEach(async () => {
    await ChatRoom.deleteMany();
    await User.deleteMany();
  });

  afterAll(() => {
    server.close();
  });

  it('should return 401 if there is no connect.sid cookie', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/10`)
      .set('Cookie', '');

    expect(response.status).toBe(401);
  });

  it('should return 401 if there is a connect.sid cookie with invalid token', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/10`)
      .set('Cookie', 'connect.sid=A; Path=/; Expires=Wed, 21 Jun 2023 23:19:23 GMT; HttpOnly');

    expect(response.status).toBe(401);
  });

  it('should return 401 if there is a connect.sid cookie with expired token', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/10`)
      .set('Cookie', 'connect.sid=s%3AGsiEJUCGLAK5TrNwfvFlMWZnsVQIVl4B.1J%2F5P8kn0sk%2BYZWZeMTqziDHo2xLf%2Fbe5HV2dMGeSWU;Domain=127.0.0.1; Path=/; Expires=Thu, 08 Jun 2023 18:23:59 GMT; HttpOnly; SameSite=None');

    expect(response.status).toBe(401);
  });

  it('should return 200 if user has a valid connect.sid cookie with session', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/10`)
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(200);
  });

  it('should return 400 if the chat room ID is invalid', async () => {
    const response = await request(server)
      .get('/api/messages/invalidId/0/10')
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(400);
  });

  it('should return 400 if the start parameter is invalid', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/a/10`)
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(400);
  });
  
  it('should return 400 if the start parameter is less than 0', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/-1/10`)
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(400);
  });
  
  it('should return 400 if the limit parameter is invalid', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/a`)
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(400);
  });
  
  it('should return 400 if the limit parameter is less than 1', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/0`)
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(400);
  });

  it('should return 400 if the chat room does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(server)
      .get(`/api/messages/${nonExistentId}/0/10`)
      .set('Cookie', sessionCookie);

    expect(response.status).toBe(400);
  });

  it('should return 400 if user tries to access chat without their', async () => {
    const auth = await request(server)
      .post('/api/auth')
      .send({
        username: 'user3',
        password: '12345678'
      });

    const token = auth.headers['set-cookie'][0];

    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/10`)
      .set('Cookie', token);
  
    expect(response.status).toBe(400);
  });

  it('should return an empty array of messages if the chat room has no messages', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoomId}/0/10`)
      .set('Cookie', sessionCookie);
  
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.messages)).toBe(true);
    expect(response.body.messages.length).toBe(0);
    expect(response.body.reachedMax).toBeTruthy();
  });

  it('should return a valid messages range', async () => {
    const response = await request(server)
      .get(`/api/messages/${chatRoom2Id}/0/3`)
      .set('Cookie', sessionCookie);
  
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.messages)).toBe(true);
    expect(response.body.messages.length).toBe(3);
    expect(response.body.messages[0].message).toBe('4');
    expect(response.body.messages[0]).toHaveProperty('createdAt');
    expect(response.body.messages[0].from).toHaveProperty('username');
    expect(response.body.messages[0].from).toHaveProperty('avatar');
    expect(response.body.messages[0].from).toHaveProperty('avatarHex');
    expect(response.body.messages[1].message).toBe('3');
    expect(response.body.messages[2].message).toBe('2');
    expect(response.body.reachedMax).toBeFalsy();
  });
});