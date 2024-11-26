import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpCode,
  Inject,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { PhishingDto } from '../common/interfaces/attempt/dto/output.phishing.dto';
import { SendPhishingDto } from '../common/interfaces/attempt/dto/send-phishing.dto';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
  constructor(
      @Inject('PHISHING_ATTEMPT') private readonly attemptClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Send a phishing email to a specified address' })
  @Post('send')
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async sendEmailToTarget(
      @Body() sendPhishingDto: SendPhishingDto,
  ): Promise<PhishingDto> {
    try {
      const response = await firstValueFrom(
          this.attemptClient.send('send-email-to-target', sendPhishingDto),
      );
      return new PhishingDto(response);
    } catch (error) {
      if (error?.type === 'BAD_REQUEST') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error?.type === 'INTERNAL_SERVER_ERROR') {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      console.error('Unexpected error in sendEmailToTarget:', error);
      throw new HttpException(
          'An unexpected error occurred while sending phishing email',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get all phishing attempts' })
  @Get('attempts')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllAttempts(): Promise<PhishingDto[]> {
    try {
      const response = await firstValueFrom(
          this.attemptClient.send('get-all-attempts', {}),
      );
      return response.map((item) => new PhishingDto(item));
    } catch (error) {
      console.log(error)
      throw new HttpException(
          'An unexpected error occurred while fetching phishing attempts',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('on-trigger')
  @ApiOperation({ summary: 'Mark a phishing attempt as clicked' })
  @ApiQuery({
    name: 'email',
    type: String,
    description: 'Email address to mark as clicked',
  })
  async victimClick(
      @Query('email') email: string,
  ): Promise<{ success: boolean }> {
    try {
      const response = await firstValueFrom(
          this.attemptClient.send('victim-clicked', email),
      );
      return { success: response };
    } catch {

      throw new HttpException(
          'An unexpected error occurred while marking phishing attempt as clicked',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
