import express from 'express';

import { prisma } from '../../../../database/prismaClient';
import { FindAllDeliveriesAvailableController } from './FindAllDeliveriesAvailableController';

const app = express();

describe('src/modules/deliveryman/useCases/findAllDeliveriesAvailable/FindAllDeliveriesAvailableController', () => {
  const findAllDeliveriesAvailableController = new FindAllDeliveriesAvailableController();

  describe('when get all deliveries available', () => {
    describe('and can', () => {
      const request = app.request;
      const response = app.response;

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

      it('should not throw an exception', async () => {
        jest.spyOn(prisma.deliveries, 'findMany').mockResolvedValue([]);

        await expect(
          async () => await findAllDeliveriesAvailableController
            .handle(request, response)
          ).not.toThrow();
      });
    });
  });
});
