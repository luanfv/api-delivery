import { prisma } from '../../../../database/prismaClient';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

describe('src/modules/clients/useCases/createDelivery/CreateDeliveryUseCase', () => {
  const createDeliveryUseCase = new CreateDeliveryUseCase();

  describe('when try register new delivery', () => {
    describe('and "id_client" is invalid', () => {
      jest.spyOn(prisma.deliveries, 'create').mockRejectedValue(expect.anything());

      it('should throw an exception of "Not found client"', async () => {
        const expectedResult = 'Not found client';

        await expect(async () => await createDeliveryUseCase.execute({
          id_client: expect.any(String),
          item_name: expect.any(String),
        })).rejects.toThrow(expectedResult);
      });

      it('should throw an exception with cause 401', async () => {
        const expectedResult = 401;
        const result = await createDeliveryUseCase.execute({
            id_client: expect.any(String),
            item_name: expect.any(String),
          }).catch((err: Error) => err.cause);

          expect(result).toEqual(expectedResult)
      });
    });

    describe('and can register', () => {
      it('should return new delivery', async () => {
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

        const result = await createDeliveryUseCase.execute({
          id_client: '123',
          item_name: 'test',
        });
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

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
