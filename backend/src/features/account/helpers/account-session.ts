import { AuthenticationRequiredError } from '../../../shared/errors/authentication-required.error';
import { randomBytes, createHash } from 'node:crypto';
import { sign, verify } from 'jsonwebtoken';
import type { SessionGrant } from '../types/session-grant';
import type {
  AccountView,
  SessionResponseDto,
} from '../dto/account-response.dto';

const issuer = 'gym-tracker';
const audience = 'gym-tracker-web';
let key: Buffer;

export function configureSessionSigning() {
  const secret = process.env.ACCOUNT_SIGNING_KEY;
  if (secret && /^[0-9a-f]{64}$/i.test(secret)) {
    key = Buffer.from(secret, 'hex');
  } else if (
    !secret &&
    ['development', 'test'].includes(process.env.NODE_ENV ?? '')
  ) {
    key = randomBytes(32);
  } else {
    throw new Error(
      'Set ACCOUNT_SIGNING_KEY to a random 32-byte key encoded as 64 hex characters.',
    );
  }
}
export const digest = (value: string) =>
  createHash('sha256').update(value).digest('hex');
export const fresh = () => randomBytes(32).toString('base64url');
export type Issued = { refresh: string; body: SessionResponseDto };
export function issue(
  grant: (SessionGrant & { account: AccountView }) | null,
  refresh: string,
): Issued {
  if (!grant) throw new AuthenticationRequiredError();
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
  } catch (cause) {
    throw new AuthenticationRequiredError(cause);
  }
  return { grant, userId, stamp };
}
