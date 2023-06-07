import request from 'supertest';
import server from '../../../index';

describe('POST /api/auth', () => {
  const exec = async (body:Object) => {
    return request(server)
      .post('/api/auth')
      .send(body);
  };

  it('should return 200 if user gave correct credentials', async () => {
    const res = await exec({ username: 'Test1', password: '12345678' });
    expect(res.status).toBe(200);
  });
});