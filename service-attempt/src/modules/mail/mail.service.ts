import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailService {
  private transporter: Transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  /**
   * Sends an email with the provided content.
   * @param to Recipient's email address.
   * @param emailContent HTML content of the email.
   */
  async sendPhishingEmail(to: string, emailContent: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'Cyber Security Company',
      to,
      subject: 'Some testing',
      html: emailContent,
    });
  }
}
