import express from 'express';

import { CreateClientController } from './CreateClientController';
import { prisma } from '../../../../database/prismaClient';

const app = express();

describe('src/modules/clients/useCases/createClient/CreateClientController', () => {
  const request = app.request;
  const response = app.response;
  const createClientController = new CreateClientController();

  beforeEach(() => {
    response.req = request;
    request.method = 'POST';

    jest.spyOn(response, 'json').mockImplementation((body) => {
      response.req.body = body;

      return response;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when pass all arguments in the request body', () => {
    beforeEach(() => {
      request.body = {
        username: 'test',
        password: '123',
      };
    });

    describe('and client already exists', () => {
      beforeAll(() => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
      });

      it('should throw an exception of "Client already exists"', async () => {
        await expect(async () => await createClientController.handle(request, response)).rejects.toThrow('Client already exists');
      });

      it('should throw an exception with cause 422', () => {
        createClientController.handle(request, response)
          .catch((err: Error) => expect(err.cause).toEqual(422));
      });
    });

    describe('and can register', () => {
      beforeAll(() => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);
        jest.spyOn(prisma.clients, 'create').mockResolvedValue({
          id: '123',
          username: 'test',
          password: expect.any(String),
        });
      });

      it('should return the new client', async () => {
        const result = await createClientController.handle(request, response);

        const expectedResult = {
          id: '123',
          username: 'test',
        };

        expect(result.req.body).toEqual(expectedResult);
      });

      it('should return status code 201', async () => {
        const result = await createClientController.handle(request, response);

        const expectedResult = 201;

        expect(result.statusCode).toEqual(expectedResult);
      });
    });
  });

  describe('when not passing all arguments in the request body', () => {
    beforeEach(() => {
      request.body = {
        username: 'test',
      };
    });

    it('should throw an exception', async () => {
      await expect(async () => await createClientController.handle(request, response)).rejects.toThrow();
    });
  });
});
