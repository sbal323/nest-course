import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService{

  constructor(private repository: MessagesRepository){

  }

  async getById(id: string){
    return await this.repository.getById(id);
  }

  getAll(){
    return this.repository.getAll();
  }

  create(message:string){
    this.repository.create(message);
  }
}
