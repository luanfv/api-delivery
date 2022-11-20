import express from 'express';

import { CreateDeliveryController } from './CreateDeliveryController';
import { prisma } from '../../../../database/prismaClient';

const app = express();

describe('src/modules/clients/useCases/createDelivery/CreateDeliveryController', () => {
  const request = app.request;
  const response = app.response;
  const createDeliveryController = new CreateDeliveryController();

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

  describe('when cannot register new delivery because missed item_name', () => {

    it('should expect error', async () => {
      request.body = {
        id_client: expect.anything(),
      };

      await expect(async () => await createDeliveryController.handle(request, response))
        .rejects.toThrow('Unidentified "item_name"');
    });
  });

  describe('when cannot register new delivery because missed id_client', () => {
    beforeEach(() => {
      request.body = {
        item_name: expect.anything(),
      };
    });

    it('should expect error', async () => {
      const expectedResult = 'Unidentified client';

      await expect(async () => await createDeliveryController.handle(request, response))
        .rejects.toThrow(expectedResult);
    });

    it('should cause', async () => {
      const expectedResult = 401;
      const result = await createDeliveryController.handle(request, response)
        .catch((err: Error) => err.cause);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('when can register new delivery', () => {
    beforeEach(() => {
      request.body = {
        id_client: '123',
        item_name: 'test',
      };

      jest.spyOn(prisma.deliveries, 'create').mockImplementation((item: any) => {
        return {
          ...item.data,
          id: expect.any(String),
          client: expect.anything(),
          id_deliveryman: null,
          deliveryman: null,
          created_at: expect.any(Date),
          end_at: null,
        };
      });
    });

    it('should return new delivery', async () => {
      const result = await createDeliveryController.handle(request, response);
      const expectedResult = {
        id_client: '123',
        item_name: 'test',
        id: expect.any(String),
        client: expect.anything(),
        id_deliveryman: null,
        deliveryman: null,
        created_at: expect.any(Date),
        end_at: null,
      };

      expect(result.req.body).toEqual(expectedResult);
    });

    it('should return status code 201', async () => {
      const result = await createDeliveryController.handle(request, response);
      const expectedResult = 201;

      expect(result.statusCode).toEqual(expectedResult);
    });
  });
});
