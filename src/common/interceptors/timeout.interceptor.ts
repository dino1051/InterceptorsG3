import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // El límite es configurable para poder reutilizar el interceptor con
  // otros valores, p. ej. @UseInterceptors(new TimeoutInterceptor(10_000)).
  constructor(private readonly timeoutMs = 3000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException(
                `La petición excedió el tiempo límite de ${this.timeoutMs} ms`,
              ),
          );
        } else {
          return throwError(() => err);
        }
      }),
    );
  }
}
