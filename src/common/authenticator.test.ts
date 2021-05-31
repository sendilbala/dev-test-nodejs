import { Request, Response } from 'express';
import authenticator from './authenticator';
import auth from '../api/authenticate';

jest.mock('../api/authenticate');
const authService = auth as jest.Mock;

describe('authenticator', () => {
  beforeEach(() => {
    jest.clearAllMocks
  });

  test('successful authentication', async () => {
    authService.mockResolvedValue(true);
    const req = {
      headers: {
        authorization: `Basic ${Buffer.from('username:password').toString('base64')}`,
      },
    } as Request;

    const next = jest.fn();

    await authenticator(req, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(authService).toHaveBeenCalledWith('username', 'password');
  });

 
});