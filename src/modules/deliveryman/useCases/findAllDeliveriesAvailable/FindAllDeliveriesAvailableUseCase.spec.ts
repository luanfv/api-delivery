import { prisma } from '../../../../database/prismaClient';
import { FindAllDeliveriesAvailableUseCase } from './FindAllDeliveriesAvailableUseCase';

describe('src/modules/deliveryman/useCases/findAllDeliveriesAvailable/FindAllDeliveriesAvailableUseCase', () => {
  const findAllDeliveriesAvailableUseCase = new FindAllDeliveriesAvailableUseCase();

  describe('when try get all deliveries available', () => {
    describe('and can', () => {
      it('should return a deliveries of available list', async () => {
        jest.spyOn(prisma.deliveries, 'findMany').mockResolvedValue([]);

        const result = await findAllDeliveriesAvailableUseCase.execute();

        expect(result instanceof Array).toEqual(true);
      });
    });
  });
});
