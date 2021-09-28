import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/core/app-logger';
import { CreateUserParams } from './params/create-user.param';
import { UsersService } from './users.service';

@ApiTags("Auth")
@Controller('auth')
export class UsersController {

  constructor(private logger: AppLogger, private service: UsersService){
    logger.setContext("Users Controller");
  }

  @ApiOperation({ description: "Create new user" })
  @ApiResponse({ status: 200, description: 'User created'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @HttpCode(200)
  @Post('signup')
  async createUser(@Body() params: CreateUserParams){
    const user = await this.service.create(params.email, params.password);
    user.password = "XXX-XXX";
    this.logger.log(JSON.stringify(user));

    return user;
  }
}
