import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendPhishingDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid recipient email format' })
  email: string;
}
