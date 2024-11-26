import { PartialType } from '@nestjs/swagger';
import { Phishing } from './phishing.schema';

export class PhishingPayload extends PartialType(Phishing) {
  createdA?: string;
  updateAt?: string;
}
