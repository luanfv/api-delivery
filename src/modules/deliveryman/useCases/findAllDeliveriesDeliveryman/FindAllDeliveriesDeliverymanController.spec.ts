import express from 'express';

import { FindAllDeliveriesDeliverymanController } from './FindAllDeliveriesDeliverymanController';
import { prisma } from '../../../../database/prismaClient';

const app = express();

describe('src/modules/deliveryman/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanController', () => {
  const request = app.request;
  const response = app.response;
  const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();

  beforeAll(() => {
    response.req = request;

    jest.spyOn(response, 'json').mockImplementation((body) => {
      response.req.body = body;

      return response;
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('when get try all delivery of a deliveryman', () => {
    describe('and not found deliveryman', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(null);
        request.body = {};
      });

      it('should throw an exception with message "Didn\'t receive the deliveryman\'s identify"', async () => {
        await expect(async () => await findAllDeliveriesDeliverymanController.handle(request, response))
          .rejects
          .toThrow('Didn\'t receive the deliveryman\'s identify');
      });

      it('should throw an exception with cause 401', async () => {
        const expectedResult = 401;
        const result = await findAllDeliveriesDeliverymanController.handle(request, response)
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('and found deliveryman', () => {
    it('should not throw an exception', async () => {
      jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(expect.anything());

      request.body = {
        id_deliveryman: '123',
      };

      await expect(
        async () => await findAllDeliveriesDeliverymanController
          .handle(request, response)
        ).not.toThrow();
    });
  });
});
