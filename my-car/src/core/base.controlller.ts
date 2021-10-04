import { HttpStatus, Inject, Res, UseInterceptors } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Response } from 'express';
import { ProcessResponseInterceptor } from 'src/interceptors/process-response.interceptor';
import { BaseResult } from './base-response';

@UseInterceptors(ProcessResponseInterceptor)
export class BaseController{

  constructor() {}

  async processResponse(fn:() => Promise<BaseResult>,  @Res() response: Response){
    try{
      const responseObject = await fn();
      response.status(responseObject.statusCode).send(responseObject);
    }
    catch(error){
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(new BaseResult({
        error: error,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      }));
    }
  }
}
