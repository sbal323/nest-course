import { Controller, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Test")
@Controller('test')
export class TestController {

  @Get()
  getMessages(){
    return "This is a test";
  }

  @Delete()
  deleteMessages(){
    return "Tests deleted";
  }
}
