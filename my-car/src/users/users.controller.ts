import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/core/app-logger';
import { CreateUserParams } from './params/create-user.param';

@ApiTags("Auth")
@Controller('auth')
export class UsersController {

  constructor(private logger: AppLogger){
    logger.setContext("Users Controller");
  }

  @ApiOperation({ description: "Create new user" })
  @ApiResponse({ status: 200, description: 'User created'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @HttpCode(200)
  @Post('signup')
  createUser(@Body() params: CreateUserParams){
    this.logger.log(params);
  }
}
