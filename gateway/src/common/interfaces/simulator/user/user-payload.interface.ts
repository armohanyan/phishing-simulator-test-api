import { PartialType } from '@nestjs/swagger';
import IUser from "./user.interface";

export interface IUserPayload extends IUser {
  createdA?: string;
  updateAt?: string;
}
