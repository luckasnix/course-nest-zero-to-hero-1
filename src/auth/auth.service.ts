import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, QueryFailedError } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './auth.entity';
import type { JwtPayload, AuthData } from './auth.types';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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
      return `User with ID ${result.identifiers[0].id} created`;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Username already exists.');
      }
      throw new InternalServerErrorException('Unknown error.');
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<AuthData> {
    const { username, password } = createUserDto;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password.');
    }
    const passwordComparisonResult = await bcrypt.compare(
      password,
      user.password,
    );
    if (!passwordComparisonResult) {
      throw new UnauthorizedException('Incorrect username or password.');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
