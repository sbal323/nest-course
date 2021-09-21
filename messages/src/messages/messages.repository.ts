import { Injectable } from "@nestjs/common";
import { promises } from "fs";
const { readFile, writeFile } = promises;

@Injectable()
export class MessagesRepository{

  private fileName: string = 'messages.json';

  async getById(id: string){
    const content = await readFile(this.fileName , 'utf-8');
    const messages = JSON.parse(content);

    return messages[id];
  }

  async getAll(){
    const content = await readFile(this.fileName , 'utf-8');
    const messages = JSON.parse(content);

    return messages;
  }

  async create(message:string){
    const content = await readFile(this.fileName , 'utf-8');
    const messages = JSON.parse(content);

    const id = Math.floor(Math.random() * 9999) + "";

    messages[id] = {id, message};

    await writeFile(this.fileName, JSON.stringify(messages));
  }

}
