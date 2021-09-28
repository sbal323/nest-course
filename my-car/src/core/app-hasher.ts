import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AppHasher{

  async getHash(text : string) : Promise<string> {
    const hash = await bcrypt.hash(text, saltOrRounds);

    return hash;
  }

  async isMatch(text: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(text, hash);

    return isMatch;

  }

}
