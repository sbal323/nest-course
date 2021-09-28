import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppHasher } from 'src/core/app-hasher';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repository: Repository<User>, private hasher: AppHasher){

  }

  async create(email: string, password: string): Promise<User>{
    const user = this.repository.create({email, password: await this.hasher.getHash(password)});

    return this.repository.save(user);
  }

}
