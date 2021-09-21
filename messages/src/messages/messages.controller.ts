import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageParam } from './params/create-message.param';

@ApiTags("Messages")
@Controller('messages')
export class MessagesController {

  constructor(private service: MessagesService){

  }

  @Get()
  getMessages(){
    return this.service.getAll();
  }

  @ApiOperation({ description: "Get Message by id" })
  @ApiResponse({ status: 200, description: 'Message found'})
  @ApiResponse({ status: 404, description: 'Message does not exist'})
  @Get(':id')
  async getMessage(@Param('id') id: string){
    const message = await this.service.getById(id);

    if(!message){
      throw new NotFoundException("Message does not exist");
    }

    return message;
  }

  @ApiOperation({ description: "Add new message"})
  @ApiResponse({ status: 200, description: 'Message created successfully'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @Post()
  createMessage(@Body() body: CreateMessageParam){
    this.service.create(body.content);
    return "Message created successfully";
  }

}
