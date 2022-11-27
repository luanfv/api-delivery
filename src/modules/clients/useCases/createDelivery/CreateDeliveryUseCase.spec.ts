import { prisma } from '../../../../database/prismaClient';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

describe('src/modules/clients/useCases/createDelivery/CreateDeliveryUseCase', () => {
  const createDeliveryUseCase = new CreateDeliveryUseCase();

  describe('when try register new delivery', () => {
    describe('and not found client', () => {
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

        expect(result).toEqual(expectedResult);
      });
    });

    describe('and manages to register', () => {
      it('should return the value', async () => {
        jest.spyOn(prisma.deliveries, 'create').mockResolvedValue(expect.anything());

        const result = await createDeliveryUseCase.execute({
          id_client: expect.any(String),
          item_name: expect.any(String),
        });

        expect(result).toBeTruthy();
      });
    });
  });
});
