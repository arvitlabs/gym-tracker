import { UnauthorizedException } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { sign, verify } from 'jsonwebtoken';
import type { Grant } from './persistence/account.repository';
import type {
  AccountView,
  SessionResponseDto,
} from './dto/account-response.dto';

const issuer = 'gym-tracker-dev';
const audience = 'gym-tracker-web';
// Development-only sessions. A restart can restore the session via its persisted refresh verifier.
const key = randomBytes(48);
export const digest = (value: string) =>
  createHash('sha256').update(value).digest('hex');
export const fresh = () => randomBytes(32).toString('base64url');
export type Issued = { refresh: string; body: SessionResponseDto };
export function issue(
  grant: (Grant & { account: AccountView }) | null,
  refresh: string,
): Issued {
  if (!grant) throw new UnauthorizedException();
  const { id, userId, account } = grant;
  const accessToken = sign(
    { grant: id, security_stamp: grant.securityStamp },
    key,
    {
      algorithm: 'HS256',
      issuer,
      audience,
      subject: userId,
      expiresIn: '10m',
    },
  );
  return { refresh, body: { ...account, accessToken } };
}
export function verifyAccess(access: string) {
  let grant: string, userId: string, stamp: string;
  try {
    const payload = verify(access, key, {
      algorithms: ['HS256'],
      issuer,
      audience,
    });
    if (
      typeof payload === 'string' ||
      typeof payload.grant !== 'string' ||
      typeof payload.security_stamp !== 'string' ||
      !payload.sub
    )
      throw new Error();
    grant = payload.grant;
    stamp = payload.security_stamp;
    userId = payload.sub;
  } catch {
    throw new UnauthorizedException();
  }
  return { grant, userId, stamp };
}
