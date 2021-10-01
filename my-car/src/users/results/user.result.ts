import { BaseResult } from "src/core/base-response";

export class UserResult extends BaseResult{
  user: UserDto;

  constructor(){
    super();
    this.user = new UserDto();
  }
}

export class UserDto{

  id: number;
  email: string;

  constructor(){
    this.id = null;
    this.email = null;
  }

}
