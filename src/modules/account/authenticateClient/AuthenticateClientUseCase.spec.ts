import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';
import { prisma } from '../../../database/prismaClient';

describe('src/modules/account/authenticateClient/AuthenticateClientUseCase', () => {
  const authenticateClientUseCase = new AuthenticateClientUseCase();

  describe('when try authenticate client', () => {
    describe('and client is not find', () => {
      it('should throw an exception of "Username or password invalid!"', async () => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(null);

        await expect(async () => await authenticateClientUseCase.execute(expect.anything())).rejects.toThrow('Username or password invalid!');
      });
    });

    describe('and password is invalid', () => {
      it('should throw an exception of "Username or password invalid!"', async () => {
        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

        await expect(async () => await authenticateClientUseCase.execute(expect.anything())).rejects.toThrow('Username or password invalid!');
      });
    });

    describe('and can with successfully', () => {
      it('should return a token', async () => {
        const fakeToken = 'fake token';

        jest.spyOn(prisma.clients, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => fakeToken);

        const result = await authenticateClientUseCase.execute(expect.anything());
        const expectedToken = { token: 'fake token' };

        expect(result).toEqual(expectedToken);
      });
    });
  });
});
