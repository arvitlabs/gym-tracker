import type { Prisma } from '../../../generated/prisma/client';

export const accountViewSelect = {
  name: true,
  profile: { select: { userId: true } },
  plans: { where: { status: 'ACTIVE' }, select: { id: true }, take: 1 },
} satisfies Prisma.UserSelect;

export type AccountViewRow = Prisma.UserGetPayload<{
  select: typeof accountViewSelect;
}>;

export const usableRefreshTokenWhere = () => ({
  revokedAt: null,
  isUsed: false,
  expiresAt: { gt: new Date() },
});
