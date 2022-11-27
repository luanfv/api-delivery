import express from 'express';

import { CreateClientController } from './CreateClientController';
import { CreateClientUseCase } from './CreateClientUseCase';

const app = express();

describe('src/modules/clients/useCases/createClient/CreateClientController', () => {
  const request = app.request;
  const response = app.response;
  const createClientController = new CreateClientController();

  beforeEach(() => {
    response.req = request;

    jest.spyOn(response, 'json').mockImplementation((body) => {
      response.req.body = body;

      return response;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when try register new client', () => {
    describe('and not receive password', () => {
      beforeEach(() => {
        request.body = {
          username: 'test',
        };
      });

      it('should throw an exception with message "Didn\'t receive password"', async () => {
        await expect(
          async () => await createClientController
            .handle(request, response)
          ).rejects
          .toThrow('Didn\'t receive password');
      });

      it('should throw an exception with cause 422', async () => {
        const expectedResult = 422;
        const result = await createClientController
          .handle(request, response)
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and not receive username', () => {
      beforeEach(() => {
        request.body = {
          password: 'test',
        };
      });

      it('should throw an exception with message "Didn\'t receive username"', async () => {
        await expect(
          async () => await createClientController
            .handle(request, response)
          ).rejects
          .toThrow('Didn\'t receive username');
      });

      it('should throw an exception with cause 422', async () => {
        const expectedResult = 422;
        const result = await createClientController
          .handle(request, response)
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and manages to register', () => {
      beforeEach(() => {
        jest.spyOn(CreateClientUseCase.prototype, 'execute').mockImplementation((item) => Promise.resolve({
          id: '123',
          username: item.username,
        }));

        request.body = {
          username: 'test',
          password: '123',
        };
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
});
