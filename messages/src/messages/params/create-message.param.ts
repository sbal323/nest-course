import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDefined } from "class-validator";

export class CreateMessageParam{

  @ApiProperty()
  @IsDefined({
    message: "'content' property is expected"
  })
  @IsString({
    message: "'content' property should have type of string"
  })
  content: string;

}
