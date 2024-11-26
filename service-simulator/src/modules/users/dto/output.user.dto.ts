import { User } from '../../../schemas/user/user.schema';

export class UserDto {
  id: string;
  email: string;
  fullName: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.fullName = user.fullName;
  }
}
