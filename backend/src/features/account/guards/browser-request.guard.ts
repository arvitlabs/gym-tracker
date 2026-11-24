import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class BrowserRequestGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.method !== 'GET' && req.headers['x-gym-request'] !== '1')
      throw new ForbiddenException();
    return true;
  }
}
