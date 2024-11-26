import { Controller } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendPhishingDto } from './dto/send-phishing.dto';
import { ApiTags } from '@nestjs/swagger';
import { PhishingDto } from './dto/output.phishing.dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @MessagePattern('send-email-to-target')
  async sendEmailToTarget(
    sendPhishingDto: SendPhishingDto,
  ): Promise<PhishingDto> {
    const response = await this.phishingService.sendEmailToTarget(
      sendPhishingDto.email,
    );

    return new PhishingDto(response);
  }

  @MessagePattern('victim-clicked')
  async victimClick(email: string): Promise<{ success: boolean }> {
    await this.phishingService.markAttemptAsClicked(email);

    return { success: true };
  }

  @MessagePattern('get-all-attempts')
  async getAllAttempts(): Promise<PhishingDto[]> {
    const attempts = await this.phishingService.getAllAttempts();

    return attempts.map((attempt) => new PhishingDto(attempt));
  }
}
