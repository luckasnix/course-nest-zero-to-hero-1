import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { AuthData } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  postSignUpHandler(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @HttpCode(201)
  postSignInHandler(@Body() createUserDto: CreateUserDto): Promise<AuthData> {
    return this.authService.signIn(createUserDto);
  }
}
