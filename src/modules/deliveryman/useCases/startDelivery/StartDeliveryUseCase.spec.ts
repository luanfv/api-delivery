import { StartDeliveryUseCase } from './StartDeliveryUseCase';
import { prisma } from '../../../../database/prismaClient';

describe('src/modules/deliveryman/useCases/startDelivery/StartDeliveryUseCase', () => {
  const startDeliveryUseCase = new StartDeliveryUseCase();

  describe('when try start a delivery', () => {
    describe('and don\'t find delivery or deliveryman', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveries, 'updateMany').mockResolvedValue(({
          count: 0,
        }));
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should throw an exception with message "Delivery is not found"', async () => {
        await expect(
          async () => await startDeliveryUseCase
            .execute({
              id_delivery: expect.any(String),
              id_deliveryman: expect.any(String),
            }),
          ).rejects.toThrow('Delivery is not found');
      });

      it('should throw an exception with cause 404', async () => {
        const expectedResult = 404;
        const result = await startDeliveryUseCase
          .execute({
            id_delivery: expect.any(String),
            id_deliveryman: expect.any(String),
          })
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and manages to start', () => {
      it('should return the updated delivery', async () => {
        const id_delivery = '123';
        const id_deliveryman = '321';

        jest.spyOn(prisma.deliveries, 'updateMany').mockResolvedValue(({
          count: 1,
        }));
        jest.spyOn(prisma.deliveries, 'findFirst').mockResolvedValue(({
          id: '123',
          item_name: expect.any(String),
          id_client: expect.any(String),
          created_at: expect.anything(),
          id_deliveryman: '321',
          end_at: null,
        }));

        const result = await startDeliveryUseCase.execute({ id_delivery, id_deliveryman });
        const expectedResult = {
          id: '123',
          item_name: expect.any(String),
          id_client: expect.any(String),
          created_at: expect.anything(),
          id_deliveryman: '321',
          end_at: null,
        };

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
