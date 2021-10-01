import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/core/app-logger';
import { CreateUserParams } from './params/create-user.param';
import { UsersService } from './users.service';
import { Response } from 'express';
import { BaseController } from 'src/core/base.controlller';
import { User } from './user.entity';
import { UpdateUserParams } from './params/update-user.param';


@ApiTags("Auth")
@Controller('auth')
export class UsersController extends  BaseController {

  constructor(private logger: AppLogger, private service: UsersService){
    super();
    logger.setContext("Users Controller");
  }

  @ApiOperation({ description: "Create new user" })
  @ApiResponse({ status: 200, description: 'User created'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @Post('signup')
  async createUser(@Body() params: CreateUserParams, @Res() response: Response){

    this.processResponse(() => { return this.service.create(params.email, params.password) }, response);

  }

  @ApiOperation({ description: "Get user by id" })
  @ApiResponse({ status: 200, description: 'User object'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @Get(':id')
  async geteUser(@Param('id') id: number,  @Res() response: Response){

    this.processResponse(() => { return this.service.get(id) }, response);

  }

  @ApiOperation({ description: "Update user properties by id" })
  @ApiResponse({ status: 200, description: 'User created'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() params: UpdateUserParams, @Res() response: Response){

    this.processResponse(() => { return this.service.update(id, params) }, response);

  }

  @ApiOperation({ description: "Delete user by id" })
  @ApiResponse({ status: 200, description: 'User deleted'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() response: Response){

    this.processResponse(() => { return this.service.remove(id) }, response);

  }
}
