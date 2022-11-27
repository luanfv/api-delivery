import { prisma } from '../../../../database/prismaClient';
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

describe('src/modules/deliveryman/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanUseCase', () => {
  const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase();

  describe('when get try all delivery of a deliveryman', () => {
    describe('and not found deliveryman', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(null);
      });

      it('should throw an exception with message "Deliveryman not found"', async () => {
        await expect(async () => await findAllDeliveriesDeliverymanUseCase.execute('id'))
          .rejects
          .toThrow('Deliveryman not found');
      });

      it('should throw an exception with cause 404', async () => {
        const expectedResult = 404;
        const result = await findAllDeliveriesDeliverymanUseCase.execute('id')
          .catch((err: Error) => err.cause);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and found deliveryman', () => {
      it('should return deliveries', async () => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(({
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
        }) as any);

        const result = await findAllDeliveriesDeliverymanUseCase.execute('123');
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

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
