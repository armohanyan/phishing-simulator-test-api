import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user/user.schema';
import { UserPayload } from '../../schemas/user/user.payload';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<User>,
  ) {}

  /**
   * Retrieves a user account by its ID.
   * @param id User ID to fetch account information.
   * @returns The user account details as a `UserPayload` object.
   * @throws NotFoundException if no user is found with the provided ID.
   */

  async getAccount(id: string): Promise<UserPayload> {
    const user = await this.userSchema.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }

    return user.toObject() as UserPayload;
  }
}
