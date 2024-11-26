import { Phishing } from '../../../schemas/phishing/phishing.schema';

export class PhishingDto {
  id: string;
  email: string;
  content: string;
  status: string;

  constructor(phishing: Phishing) {
    this.id = phishing.id;
    this.email = phishing.email;
    this.content = phishing.content;
    this.status = phishing.status;
  }
}
