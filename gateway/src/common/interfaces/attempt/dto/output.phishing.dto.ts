
export interface IPhishing {
  id?: string;
  email: string;
  content: string;
  status: string;
}

export class PhishingDto {
  id: string;
  email: string;
  content: string;
  status: string;

  constructor(phishing: IPhishing) {
    this.id = phishing.id;
    this.email = phishing.email;
    this.content = phishing.content;
    this.status = phishing.status;
  }
}
