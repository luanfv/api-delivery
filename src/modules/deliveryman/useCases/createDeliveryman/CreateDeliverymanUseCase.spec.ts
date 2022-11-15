import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';
import { prisma } from '../../../../database/prismaClient';

describe('src/modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase', () => {
  const createDeliverymanUseCase = new CreateDeliverymanUseCase();

  describe('when try register new deliveryman', () => {
    describe('and deliveryman already exists', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(expect.anything());
      });

      it('should throw an exception of "Deliveryman already exists"', async () => {
        await expect(async () => await createDeliverymanUseCase.execute(expect.anything())).rejects.toThrow('Deliveryman already exists');
      });

      it('should throw an exception with cause 422', () => {
        createDeliverymanUseCase.execute(expect.anything())
          .catch((err: Error) => expect(err.cause).toEqual(422));
      });
    });

    describe('and can register', () => {
      it('should return id and username of the new deliveryman', async () => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(null);
        jest.spyOn(prisma.deliveryman, 'create').mockResolvedValue({
          id: '123',
          username: 'test',
          password: expect.any(String),
        });

        const result = await createDeliverymanUseCase.execute({
          username: 'test',
          password: '123',
        });

        const expectedDeliveryman = {
          id: '123',
          username: 'test',
        };

        expect(result).toEqual(expectedDeliveryman);
      });
    })
  });
});
