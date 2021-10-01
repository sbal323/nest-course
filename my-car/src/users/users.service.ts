import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppHasher } from 'src/core/app-hasher';
import { mapObject } from 'src/core/map-object';
import { Repository } from 'typeorm';
import { UserDto, UserResult } from './results/user.result';
import { User } from './user.entity';
import { UserEmailExistsValidator } from './validators/user-email-exists.validator';
import { UserIdExistsValidator } from './validators/user-id-exists.validator';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repository: Repository<User>, private hasher: AppHasher){

  }

  async create(email: string, password: string): Promise<UserResult>{
    const result = new UserResult();
    const validator = new UserEmailExistsValidator(this);

    if( await validator.isValid(result, email)){
      const user = this.repository.create({email, password: await this.hasher.getHash(password)});

      mapObject<UserDto>(result.user, await this.repository.save(user));
    }

    return result;
  }

  findOne(id: number): Promise<User>{
    return this.repository.findOne(id);
  }

  find(email: string): Promise<User[]>{
    return this.repository.find({email});
  }

  async get(id: number): Promise<UserResult>{
    const result = new UserResult();
    const validator = new UserIdExistsValidator(this);

    if( await validator.isValid(result, id)){
      mapObject<UserDto>(result.user, validator.user);
    }

    return result;
  }

  async update(id: number, value: Partial<User>): Promise<UserResult>{
    const result = new UserResult();
    const validator = new UserIdExistsValidator(this);

    if( await validator.isValid(result, id)){
      if(value.email){
        validator.user.email = value.email;
      }
      if(value.password){
        validator.user.password = await this.hasher.getHash(value.password);
      }
      mapObject<UserDto>(result.user, await this.repository.save(validator.user));
    }

    return result;
  }

  async remove(id: number): Promise<UserResult>{
    const result = new UserResult();
    const validator = new UserIdExistsValidator(this);

    if( await validator.isValid(result, id)){
      mapObject<UserDto>(result.user, await this.repository.remove(validator.user));
    }

    return result;
  }

}
