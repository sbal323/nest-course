import { BaseResult } from "src/core/base-response";
import { User } from "../user.entity";

export class UserResult extends BaseResult{
  user: User;
}
