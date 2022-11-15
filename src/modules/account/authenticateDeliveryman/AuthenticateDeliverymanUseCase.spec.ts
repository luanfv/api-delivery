import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';
import { prisma } from '../../../database/prismaClient';

describe('src/modules/account/authenticateDeliveryman/AuthenticateDeliverymanUseCase', () => {
  const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

  describe('when try authenticate deliveryman', () => {
    describe('and deliveryman is not find', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(null);
      });

      it('should throw an exception of "Username or password invalid!"', async () => {
        await expect(async () => await authenticateDeliverymanUseCase.execute(expect.anything())).rejects.toThrow('Username or password invalid!');
      });

      it('should throw an exception with cause 401', () => {
        authenticateDeliverymanUseCase.execute(expect.anything())
          .catch((err: Error) => expect(err.cause).toEqual(401));
      });
    });

    describe('and password is invalid', () => {
      beforeAll(() => {
        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));
      });

      it('should throw an exception of "Username or password invalid!"', async () => {
        await expect(async () => await authenticateDeliverymanUseCase.execute(expect.anything())).rejects.toThrow('Username or password invalid!');
      });

      it('should throw an exception with cause 401', () => {
        authenticateDeliverymanUseCase.execute(expect.anything())
          .catch((err: Error) => expect(err.cause).toEqual(401));
      });
    });

    describe('and can with successfully', () => {
      it('should return a token', async () => {
        const fakeToken = 'fake token';

        jest.spyOn(prisma.deliveryman, 'findFirst').mockResolvedValue(expect.anything());
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => fakeToken);

        const result = await authenticateDeliverymanUseCase.execute(expect.anything());
        const expectedToken = { token: 'fake token' };

        expect(result).toEqual(expectedToken);
      });
    });
  });
});
