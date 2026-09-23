import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
          path: request.url,
          data: this.sanitize(data),
        };
      }),
    );
  }
  private sanitize(data: any) {
    if (Array.isArray(data)) {
      return data.map((order) => this.sanitizeOrder(order));
    }

    return this.sanitizeOrder(data);
  }
  private sanitizeOrder(order: any) {
    const { passwordHash, ...customer } = order.customer;

    const { clientSecret, creditCard, ...payment } = order.payment;

    return {
      ...order,
      customer,
      payment: {
        ...payment,
        creditCard: this.maskCreditCard(creditCard),
      },
    };
  }

  private maskCreditCard(card: string): string {
    if (!card) {
      return card;
    }

    return `**** **** **** ${card.slice(-4)}`;
  }
}
