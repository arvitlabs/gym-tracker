import { PhoneAlreadyRegisteredError } from '../errors/phone-already-registered.error';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../infrastructure/database/database.module';
import { Prisma } from '../../../generated/prisma/client';
import { toAccountView } from '../helpers/account-view';
import { refreshTokenExpiry } from '../helpers/refresh-token-expiry';
import { accountViewSelect, usableRefreshTokenWhere } from './account-queries';

@Injectable()
export class AccountRepository {
  constructor(private readonly db: DatabaseService) {}
  credentials(phone: string) {
    return this.db.user.findUnique({
      where: { phone },
      select: {
        id: true,
        securityStamp: true,
        passwordHash: true,
        isActive: true,
      },
    });
  }
  async register(
    phone: string,
    name: string,
    passwordHash: string,
    tokenHash: string,
  ) {
    try {
      return await this.db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { phone, name, passwordHash, phoneVerifiedAt: new Date() },
          select: { id: true, securityStamp: true, ...accountViewSelect },
        });
        const grant = await tx.refreshToken.create({
          data: {
            userId: user.id,
            securityStamp: user.securityStamp,
            tokenHash,
            expiresAt: refreshTokenExpiry(),
          },
          select: { id: true, userId: true },
        });
        return {
          ...grant,
          securityStamp: user.securityStamp,
          account: toAccountView(user),
        };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        JSON.stringify(error.meta).includes('phone')
      )
        throw new PhoneAlreadyRegisteredError(error);
      throw error;
    }
  }
  async start(id: string, userId: string, stamp: string, tokenHash: string) {
    try {
      const user = await this.db.user.update({
        where: { id: userId, isActive: true, securityStamp: stamp },
        data: {
          refreshTokens: {
            create: {
              id,
              securityStamp: stamp,
              tokenHash,
              expiresAt: refreshTokenExpiry(),
            },
          },
        },
        select: accountViewSelect,
      });
      return { id, userId, securityStamp: stamp, account: toAccountView(user) };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        return null;
      throw error;
    }
  }

  rotate(oldHash: string, newHash: string) {
    return this.db.$transaction(async (tx) => {
      const grant = await tx.refreshToken.findUnique({
        where: { tokenHash: oldHash },
        select: { id: true, userId: true, securityStamp: true },
      });
      if (!grant) return null;
      // Match the original hash again on the write so only one concurrent refresh succeeds.
      const updated = await tx.refreshToken.updateMany({
        where: {
          id: grant.id,
          tokenHash: oldHash,
          ...usableRefreshTokenWhere(),
          user: { isActive: true, securityStamp: grant.securityStamp },
        },
        data: {
          tokenHash: newHash,
          lastSeenAt: new Date(),
          expiresAt: refreshTokenExpiry(),
        },
      });
      if (!updated.count) return null;
      const user = await tx.user.findUniqueOrThrow({
        where: { id: grant.userId },
        select: accountViewSelect,
      });
      return { ...grant, account: toAccountView(user) };
    });
  }

  async current(id: string, userId: string, securityStamp: string) {
    const grant = await this.db.refreshToken.findFirst({
      where: {
        id,
        userId,
        securityStamp,
        ...usableRefreshTokenWhere(),
        user: { isActive: true },
      },
      select: {
        securityStamp: true,
        user: { select: { ...accountViewSelect, securityStamp: true } },
      },
    });
    return grant && grant.securityStamp === grant.user.securityStamp
      ? toAccountView(grant.user)
      : null;
  }
  resetPassword(phone: string, passwordHash: string) {
    return this.db.$transaction(async (tx) => {
      const updated = await tx.user.updateMany({
        where: { phone, isActive: true },
        data: { passwordHash, securityStamp: randomUUID() },
      });
      if (!updated.count) return false;
      await tx.refreshToken.updateMany({
        where: { user: { phone }, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return true;
    });
  }
  revoke(tokenHash: string) {
    return this.db.refreshToken.updateMany({
      where: { tokenHash },
      data: { revokedAt: new Date() },
    });
  }
}
