import { UsersService } from "../users.service";
import { Response } from 'express';
import { HttpStatus, NotFoundException } from "@nestjs/common";
import { BaseResult } from "src/core/base-response";
import { User } from "../user.entity";

export class UserIdExistsValidator{

  user: User;
  constructor(private service: UsersService){

  }

  async isValid(result: BaseResult, id: number): Promise<boolean> {
    const exist = await this.service.findOne(id);

    if(!exist){
      result.statusCode = HttpStatus.NOT_FOUND;
      result.error = "User with provided id does not exist";
      //throw new NotFoundException("User with provided id does not exist");

      return false;
    }

    this.user = exist;

    return true;
  }
}
