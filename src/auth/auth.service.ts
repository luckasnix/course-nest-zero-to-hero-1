import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './auth.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<string> {
    const { username, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const result = await this.userRepository.insert({
        username,
        password: hashedPassword,
      });
      return `user with ID ${result.identifiers[0].id} created`;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('username already exists.');
      }
      throw new InternalServerErrorException('unknown error.');
    }
  }
}
