import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dto/output.user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('sign-up')
  async signUp(signUpDto: SignUpDto): Promise<unknown> {
    return await this.authService.signUp(signUpDto);
  }

  @MessagePattern('sign-in')
  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string; data: UserDto }> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
