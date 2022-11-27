import express from 'express';

import { EndDeliveryController } from './EndDeliveryController';
import { prisma } from '../../../../database/prismaClient';

const app = express();

describe('src/modules/deliveryman/useCases/startDelivery/EndDeliveryController', () => {
  const request = app.request;
  const response = app.response;
  const endDeliveryController = new EndDeliveryController();

  describe('when try end delivery', () => {
    describe('and don\'t receive "id_deliveryman"', () => {
      beforeAll(() => {
        request.body = {};
        request.params = { id: expect.any(String) };
      });

      it('should throw an exception with message "Didn\'t receive the deliveryman\'s identify"', async () => {
        await expect(
          async () => await endDeliveryController
            .handle(request, response),
          ).rejects.toThrow('Didn\'t receive the deliveryman\'s identify');
      });

      it('should throw an exception with cause 401', async () => {
        const expectedResult = 401;
        const result = await endDeliveryController
          .handle(request, response)
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and don\'t receive "id"', () => {
      beforeAll(() => {
        request.body = { id_deliveryman: expect.any(String) };
        request.params = {};
      });

      it('should throw an exception with message "Missing information to complete this process"', async () => {
        await expect(
          async () => await endDeliveryController
            .handle(request, response),
          ).rejects.toThrow('Missing information to complete this process');

      });

      it('should throw an exception with cause 422', async () => {
        const expectedResult = 422;
        const result = await endDeliveryController
          .handle(request, response)
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and manages to end', () => {
      beforeAll(() => {
        response.req = request;

        jest.spyOn(response, 'json').mockImplementation((body) => {
          response.req.body = body;

          return response;
        });
        jest.spyOn(prisma.deliveries, 'updateMany').mockResolvedValue(({
          count: 1,
        }));
        jest.spyOn(prisma.deliveries, 'findFirst').mockResolvedValue(({
          id: expect.any(String),
          item_name: expect.any(String),
          id_client: expect.any(String),
          created_at: expect.anything(),
          id_deliveryman: expect.any(String),
          end_at: null,
        }));

        request.body = { id_deliveryman: expect.any(String) };
        request.params = { id: expect.any(String) };
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return delivery', async () => {
        const result = await endDeliveryController.handle(request, response);
        const expectedResult = {
          id: expect.any(String),
          item_name: expect.any(String),
          id_client: expect.any(String),
          created_at: expect.anything(),
          id_deliveryman: expect.any(String),
          end_at: null,
        };

        expect(result.req.body).toEqual(expectedResult);
      });

      it('should return status code 200', async () => {
        const result = await endDeliveryController.handle(request, response);
        const expectedResult = 200;

        expect(result.statusCode).toEqual(expectedResult);
      });
    });
  });
});
