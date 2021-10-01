import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import {  map, Observable  } from "rxjs";
import { BaseResult } from "src/core/base-response";
import { Response } from 'express';

export class ProcessResponseInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const cntx = context.switchToHttp();
    const response = cntx.getResponse<Response>();

    return next.handle().pipe(
      map((data: BaseResult) => {
        response.status(data.statusCode).send(data);
        return data;
        })
      );
  }
}
