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

    describe('and manages to register', () => {
      it('should return the value', async () => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);
        jest.spyOn(prisma.clients, 'create').mockResolvedValue({
          id: expect.any(String),
          username: expect.any(String),
          password: '123',
        });

        const result = await createClientUseCase.execute({
          username: expect.any(String),
          password: '123',
        });

        expect(result).toBeTruthy();
      });
    })
  });
});
