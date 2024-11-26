import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user/user.schema';
import { MongoConfigService } from '../../common/config/mongo-config.service';

@Module({
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_USER_SECRET as string) || 'phishing-secret',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: (process.env.JWT_USER_TOKEN_EXPIRES_IN as string) || '1d',
        issuer: 'iss',
      },
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
