import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';
import { prisma } from '../../../database/prismaClient';

describe('src/modules/account/authenticateClient/AuthenticateClientUseCase', () => {
  describe('when try authenticate client', () => {
    describe('and client is not find', () => {
      it('should throw an exception of "Username or password invalid!"', async () => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);

        const authenticateClientUseCase = new AuthenticateClientUseCase();

        await expect(async () => await authenticateClientUseCase.execute(expect.anything())).rejects.toThrow('Username or password invalid!');
      });
    });

    describe('and password is invalid', () => {
      it('should throw an exception of "Username or password invalid!"', async () => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

        const authenticateClientUseCase = new AuthenticateClientUseCase();

        await expect(async () => await authenticateClientUseCase.execute(expect.anything())).rejects.toThrow('Username or password invalid!');
      });
    });

    describe('and can with successfully', () => {
      it('should return a token', async () => {
        const expectedToken = 'fake token';

        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => Promise.resolve(expectedToken));

        const authenticateClientUseCase = new AuthenticateClientUseCase();
        const result = await authenticateClientUseCase.execute(expect.anything());

        expect(result).toEqual(expectedToken);
      });
    });
  });
});
