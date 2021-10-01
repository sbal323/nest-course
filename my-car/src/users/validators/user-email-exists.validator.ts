import { UsersService } from "../users.service";
import { Response } from 'express';
import { HttpStatus } from "@nestjs/common";
import { BaseResult } from "src/core/base-response";

export class UserEmailExistsValidator{

  constructor(private service: UsersService){

  }

  async isValid(result: BaseResult, email: string): Promise<boolean> {
    const exist = await this.service.find(email);

    if(!exist || exist.length > 0){
      result.statusCode = HttpStatus.BAD_REQUEST;
      result.error = "User with provided email already registered";

      return false;
    }

    return true;
  }
}
