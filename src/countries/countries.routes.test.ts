import request from 'supertest';
import app from '../index';
import _authenticate from '../api/authenticate'

jest.mock('../api/authenticate')
const authenticate = _authenticate as jest.Mock

describe('Countries API', () => {
  //let request = supertest(Server);

  describe('GET /countries', () => {
    let server: unknown

	  beforeAll(async () => {
	    
	    server = app.listen(3001)
	  })

	  beforeEach(async () => {
	    jest.resetAllMocks()
	  })

    test('Success in list all countries', async () => {
      authenticate.mockResolvedValue(true)

      const response = await request(server)
        .get('/countries')
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic dXNlcm5hbWU6cGFzc3dvcmQ')

     expect(response.status).toBe(200);
    });

    test('Error 401 in GET countries', async () => {
      authenticate.mockResolvedValue(true)

      const response = await request(server)
        .get('/countries')
        .set('Accept', 'application/json')

     expect(response.status).toBe(401);
    });
  });
});