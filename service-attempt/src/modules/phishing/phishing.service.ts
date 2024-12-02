import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { Phishing } from '../../schemas/phishing/phishing.schema';
import * as process from 'node:process';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(Phishing.name)
    private readonly phishingSchema: Model<Phishing>,
    private readonly mailService: MailService,
    private jwtService: JwtService,
  ) {}

  /**
   * Sends a phishing email to the specified address and saves the attempt.
   * @param email The recipient's email address.
   * @throws RpcException if a phishing email has already been sent to the address.
   */
  async sendEmailToTarget(email: string): Promise<Phishing> {
    try {
      const token = this.jwtService.sign({
        email, // prevent email injection
      });

      console.log(token);

      const url = `${process.env.APP_URL}/phishing/on-trigger?token=${token}`;
      const content = `<p>This is a simulated phishing attempt. Click <a href="${url}">here</a> to check the result.</p>`;

      const newPhishingAttempt = new this.phishingSchema({
        email,
        status: 'pending',
        content,
      });

      await this.mailService.sendPhishingEmail(email, content);

      await newPhishingAttempt.save();

      return newPhishingAttempt;
    } catch {
      throw new RpcException({
        message: 'Failed to send phishing email.',
        type: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  /**
   * Marks a pending phishing attempt as clicked for the specified email address.
   * @throws RpcException if no pending phishing attempt is found.
   * @param token
   */
  async markAttemptAsClicked(token: string): Promise<void> {
    let email = '';

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: (process.env.JWT_USER_SECRET as string) || 'phishing-secret',
      })) as { email: string };

      email = payload.email;
    } catch {
      throw new RpcException({
        message: 'Token is Expired',
        type: 'BAD_REQUEST',
      });
    }

    const attempt = await this.phishingSchema.findOne({
      email,
    });

    if (!attempt) {
      throw new RpcException({
        message: 'No pending phishing attempt found for this email address.',
        type: 'BAD_REQUEST',
      });
    }

    attempt.status = 'clicked';
    await attempt.save();
  }

  /**
   * Retrieves all phishing attempts.
   * @returns An array of all phishing attempts.
   */
  async getAllAttempts(): Promise<Phishing[]> {
    try {
      return await this.phishingSchema.find().exec();
    } catch {
      throw new RpcException({
        message: 'Failed to retrieve phishing attempts.',
        type: 'INTERNAL_SERVER_ERROR',
      });
    }
  }
}
