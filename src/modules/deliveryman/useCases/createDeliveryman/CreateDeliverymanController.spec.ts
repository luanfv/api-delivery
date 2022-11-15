import express from 'express';

import { CreateDeliverymanController } from './CreateDeliverymanController';
import { prisma } from '../../../../database/prismaClient';

const app = express();

describe('src/modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController', () => {
  const request = app.request;
  const response = app.response;
  const createDeliverymanController = new CreateDeliverymanController();

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

    describe('and deliveryman already exists', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(expect.anything());
      });

      it('should throw an exception of "Deliveryman already exists"', async () => {
        await expect(async () => await createDeliverymanController.handle(request, response)).rejects.toThrow('Deliveryman already exists');
      });

      it('should throw an exception with cause 422', () => {
        createDeliverymanController.handle(request, response)
          .catch((err: Error) => expect(err.cause).toEqual(422));
      });
    });

    describe('and can register', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(null);
        jest.spyOn(prisma.deliveryman, 'create').mockResolvedValue({
          id: '123',
          username: 'test',
          password: expect.any(String),
        });
      });

      it('should return the new deliveryman', async () => {
        const result = await createDeliverymanController.handle(request, response);

        const expectedResult = {
          id: '123',
          username: 'test',
        };

        expect(result.req.body).toEqual(expectedResult);
      });

      it('should return status code 201', async () => {
        const result = await createDeliverymanController.handle(request, response);

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
      await expect(async () => await createDeliverymanController.handle(request, response)).rejects.toThrow();
    });
  });
});
