import { Controller, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserPayload } from '../../schemas/user/user.payload';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get-account')
  async getAccount(
    @Payload(ValidationPipe) payload: { id: string },
  ): Promise<UserPayload> {
    return this.userService.getAccount(payload.id);
  }
}
