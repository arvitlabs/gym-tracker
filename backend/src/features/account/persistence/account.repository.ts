import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../infrastructure/database/database.module';
import { Prisma } from '../../../generated/prisma/client';
import type { AccountView } from '../dto/account-response.dto';

export interface Grant {
  securityStamp: string;
  id: string;
  userId: string;
}
export class PhoneAlreadyRegistered extends Error {}
const viewSelect = {
  name: true,
  profile: { select: { userId: true } },
  plans: { where: { status: 'ACTIVE' }, select: { id: true }, take: 1 },
} satisfies Prisma.UserSelect;

function toView(
  user: Prisma.UserGetPayload<{ select: typeof viewSelect }>,
): AccountView {
  const destination = user.plans.length
    ? '/home'
    : user.profile
      ? '/onboarding/plan'
      : '/onboarding';
  return { name: user.name, destination };
}

const expiry = () => new Date(Date.now() + 30 * 86400000);
const usable = () => ({
  revokedAt: null,
  isUsed: false,
  expiresAt: { gt: new Date() },
});

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
          select: { id: true, securityStamp: true, ...viewSelect },
        });
        const grant = await tx.refreshToken.create({
          data: {
            userId: user.id,
            securityStamp: user.securityStamp,
            tokenHash,
            expiresAt: expiry(),
          },
          select: { id: true, userId: true },
        });
        return {
          ...grant,
          securityStamp: user.securityStamp,
          account: toView(user),
        };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        JSON.stringify(error.meta).includes('phone')
      )
        throw new PhoneAlreadyRegistered();
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
              expiresAt: expiry(),
            },
          },
        },
        select: viewSelect,
      });
      return { id, userId, securityStamp: stamp, account: toView(user) };
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
          ...usable(),
          user: { isActive: true, securityStamp: grant.securityStamp },
        },
        data: {
          tokenHash: newHash,
          lastSeenAt: new Date(),
          expiresAt: expiry(),
        },
      });
      if (!updated.count) return null;
      const user = await tx.user.findUniqueOrThrow({
        where: { id: grant.userId },
        select: viewSelect,
      });
      return { ...grant, account: toView(user) };
    });
  }

  async current(id: string, userId: string, securityStamp: string) {
    const grant = await this.db.refreshToken.findFirst({
      where: {
        id,
        userId,
        securityStamp,
        ...usable(),
        user: { isActive: true },
      },
      select: {
        securityStamp: true,
        user: { select: { ...viewSelect, securityStamp: true } },
      },
    });
    return grant && grant.securityStamp === grant.user.securityStamp
      ? toView(grant.user)
      : null;
  }
  revoke(tokenHash: string) {
    return this.db.refreshToken.updateMany({
      where: { tokenHash },
      data: { revokedAt: new Date() },
    });
  }
}
