import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AuthenticateClientController } from './AuthenticateClientController';
import { prisma } from '../../../database/prismaClient';

const app = express();

describe('src/modules/account/authenticateClient/AuthenticateClientController', () => {
  const request = app.request;
  const response = app.response;
  const authenticateClientController = new AuthenticateClientController();

  beforeEach(() => {
    response.req = request;
    request.method = 'POST';
    request.body = {
      username: expect.any(String),
      password: expect.any(String),
    };

    jest.spyOn(response, 'json').mockImplementation((body) => {
      response.req.body = body;

      return response;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when try authenticate client', () => {
    describe('and client is not find', () => {
      beforeAll(() => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);
      });

      it('should throw an exception of "Username or password invalid!"', async () => {
        await expect(async () => await authenticateClientController.handle(request, response)).rejects.toThrow('Username or password invalid!');
      });

      it('should throw an exception with cause 401', () => {
        authenticateClientController.handle(request, response)
          .catch((err: Error) => expect(err.cause).toEqual(401));
      });
    });

    describe('and password is invalid', () => {
      beforeAll(() => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));
      });

      it('should throw an exception of "Username or password invalid!"', async () => {
        await expect(async () => await authenticateClientController.handle(request, response)).rejects.toThrow('Username or password invalid!');
      });

      it('should throw an exception with cause 401', () => {
        authenticateClientController.handle(request, response)
          .catch((err: Error) => expect(err.cause).toEqual(401));
      });
    });

    describe('and can with successfully', () => {
      const fakeToken = 'fake token';

      beforeAll(() => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => fakeToken);
      });

      it('should return the token', async () => {
        const result = await authenticateClientController.handle(request, response);
        const expectedToken = { token: 'fake token' };

        expect(result.req.body).toEqual(expectedToken);
      });

      it('should return status code 200', async () => {
        const result = await authenticateClientController.handle(request, response);
        const expectedStatus = 200;

        expect(result.statusCode).toEqual(expectedStatus);
      });
    });
  });
});
