import request from 'supertest';
import { server } from '../../../index';
import User from '../../../models/User';
import ChatRoom from '../../../models/ChatRoom';

describe('GET /api/list-users', () => {
  const clearDB = async () => {
    await User.deleteMany({});
    await ChatRoom.deleteMany({});
  }

  beforeAll(() => clearDB());

  const exec = async (phrase: any) => {
    return request(server)
      .get('/api/list-users')
      .send({ phrase });
  };

  const id:any[] = [];

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
    
    users.push(new User({
      username: 'user3',
      email: 'user3@example.com',
      avatarHex: '#123456',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    }));
    
    users.push(new User({
      username: 'Super Username',
      email: 'user4@example.com',
      avatarHex: '#123456',
      password: '$2b$15$5CW6wntRwsGIgF/FKhX3SO7/Bp9mthsfC/CqxtQ6x16dJSVOcueju' // 12345678 password
    }));

    users.forEach(async (user) => {
      const { _id } = await user.save();
      id.push(_id);
    });
  });

  afterEach(() => clearDB());
  afterAll(() => {
    server.close();
  });

  it('should return empty array when there are no users with the given phrase', async () => {
    const res = await exec('Different');
    
    expect(res.status).toBe(200);
    expect(res.body.users.length).toBe(0);
  });
  
  it('should return 400 when no string given', async () => {
    const res = await exec({ test: 'Throw pls!' });
    expect(res.status).toBe(400);
  });
  
  it('should return 400 when string is longer than 50 chars', async () => {
    const res = await exec(Array(52).join('a'));
    expect(res.status).toBe(400);
  });
  
  it('should return all users including the given phrase (ignoring case insensitive)', async () => {
    const res = await exec('user');

    expect(res.body.users[0]).toMatchObject({
      username: 'user1',
      avatar: 'test.png',
      about: { emoji: '😋', bio: 'Test' },
      avatarHex: '#123456'
    });
    expect(res.body.users[1]).toMatchObject({
      username: 'user2',
      avatarHex: '#123456'
    });
    expect(res.body.users[2]).toMatchObject({
      username: 'user3',
      avatarHex: '#123456'
    });
    expect(res.body.users[3]).toMatchObject({
      username: 'Super Username',
      avatarHex: '#123456'
    });
    expect(res.body.users.length).toBe(4);
  });
});
