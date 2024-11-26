import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PhishingDocument = HydratedDocument<Phishing>;

@Schema({ collection: 'phishing', timestamps: true })
export class Phishing extends Document {
  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
