import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  postOneHandler(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.authService.signUp(createUserDto);
  }
}
