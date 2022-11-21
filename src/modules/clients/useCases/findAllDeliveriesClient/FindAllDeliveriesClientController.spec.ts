import express from 'express';

import { FindAllDeliveriesClientController } from './FindAllDeliveriesClientController';
import { prisma } from '../../../../database/prismaClient';

const app = express();

describe('src/modules/clients/useCases/createDelivery/CreateDeliveryController', () => {
  const request = app.request;
  const response = app.response;
  const findAllDeliveriesClientController = new FindAllDeliveriesClientController();

  beforeEach(() => {
    response.req = request;
    request.method = 'GET';

    jest.spyOn(response, 'json').mockImplementation((body) => {
      response.req.body = body;

      return response;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when cannot get deliveries because missed id_client', () => {
    beforeAll(() => {
      request.body = {};
    });

    it('should throw an exception of "Unidentified client"', async () => {
      await expect(async () => await findAllDeliveriesClientController.handle(request, response))
        .rejects.toThrow('Unidentified client');
    });

    it('should throw an exception with cause 401', async () => {
      const result = await findAllDeliveriesClientController.handle(request, response)
        .catch((err: Error) => err.cause);

      expect(result).toEqual(401);
    });
  });

  describe('when can get deliveries of the client', () => {
    it('should return client and your deliveries', async () => {
      request.body = {
        id_client: '123',
      };

      jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue({
        id: expect.any(String),
        username: expect.any(String),
        deliveries: [
          {
            id: expect.any(String),
            id_client: expect.any(String),
            id_deliveryman: expect.anything(),
            item_name: expect.any(String),
            created_at: expect.any(Date),
            end_at: expect.anything(),
          },
        ],
      } as any);

      const expectedResult = {
        id: '123',
        username: expect.any(String),
        deliveries: [
          {
            id: expect.any(String),
            id_client: expect.any(String),
            id_deliveryman: expect.anything(),
            item_name: expect.any(String),
            created_at: expect.any(Date),
            end_at: expect.anything(),
          },
        ],
      };

      const result = await findAllDeliveriesClientController.handle(request, response);

      expect(result.req.body).toEqual(expectedResult);
    });
  });
});
