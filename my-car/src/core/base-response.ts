import { HttpStatus } from "@nestjs/common";

export class BaseResult{
  statusCode: number = HttpStatus.OK;
  error: string;

  public constructor(init?:Partial<BaseResult>) {
    Object.assign(this, init);
  }
}
