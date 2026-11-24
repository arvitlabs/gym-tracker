import { applicationErrors } from '../../application-error-responses';
import { ApplicationError } from '../errors/application-error';
import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { map } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        map((data) => ({ success: true, data: data ?? null, error: null })),
      );
  }
}

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  catch(cause: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const mapped =
      cause instanceof ApplicationError
        ? applicationErrors.get(cause.code)
        : undefined;
    const status =
      mapped?.status ??
      (cause instanceof HttpException ? cause.getStatus() : 500);
    let message = 'Request failed.';
    if (mapped) {
      message = mapped.message;
    } else if (status < 500 && cause instanceof HttpException) {
      const detail = cause.getResponse();
      message =
        typeof detail === 'object' && 'message' in detail
          ? [detail.message].flat().join(' ')
          : cause.message;
    } else {
      Logger.error(
        'Request failed: ' +
          (cause instanceof Error ? cause.name : 'unknown error'),
        'ApiErrorFilter',
      );
    }
    res
      .status(status)
      .set('Cache-Control', 'no-store')
      .json({
        success: false,
        data: null,
        error: { code: HttpStatus[status], message },
      });
  }
}
