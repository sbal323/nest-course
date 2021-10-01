import { HttpStatus, Inject, Res } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Response } from 'express';
import { BaseResult } from './base-response';

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
