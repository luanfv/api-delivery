import { prisma } from '../../../../database/prismaClient';
import { FindAllDeliveriesClientUseCase } from './FindAllDeliveriesClientUseCase';

describe('src/modules/clients/useCases/findAllDeliveriesClient/FindAllDeliveriesClientUseCase', () => {
  const findAllDeliveriesClientUseCase = new FindAllDeliveriesClientUseCase();

  describe('when cannot get deliveries of the client', () => {
    beforeAll(() => {
      jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);
    });

    it('should throw an exception of "Client not found"', async () => {
      const expectedResult = 'Client not found';

      await expect(async () => await findAllDeliveriesClientUseCase.execute(expect.any(String)))
        .rejects.toThrow(expectedResult);
    });

    it('should throw an exception with cause 404', async () => {
      const expectedResult = 404;
      const result = await findAllDeliveriesClientUseCase.execute(expect.any(String))
        .catch((err: Error) => err.cause);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('when can get deliveries of the client', () => {
    it('should return client and your deliveries', async () => {
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

      const result = await findAllDeliveriesClientUseCase.execute('123');
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
