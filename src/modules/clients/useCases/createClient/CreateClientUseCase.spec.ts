import { CreateClientUseCase } from './CreateClientUseCase';
import { prisma } from '../../../../database/prismaClient';

describe('src/modules/clients/useCases/createClient/CreateClientUseCase', () => {
  const createClientUseCase = new CreateClientUseCase();

  describe('when try register new client', () => {
    describe('and client already exists', () => {
      beforeAll(() => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
      });

      it('should throw an exception of "Client already exists"', async () => {
        await expect(async () => await createClientUseCase.execute(expect.anything())).rejects.toThrow('Client already exists');
      });

      it('should throw an exception with cause 422', () => {
        createClientUseCase.execute(expect.anything())
          .catch((err: Error) => expect(err.cause).toEqual(422));
      });
    });

    describe('and can register', () => {
      it('should return id and username of the new client', async () => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);
        jest.spyOn(prisma.clients, 'create').mockResolvedValue({
          id: '123',
          username: 'test',
          password: expect.any(String),
        });

        const result = await createClientUseCase.execute({
          username: 'test',
          password: '123',
        });

        const expectedClient = {
          id: '123',
          username: 'test',
        };

        expect(result).toEqual(expectedClient);
      });
    })
  });
});
