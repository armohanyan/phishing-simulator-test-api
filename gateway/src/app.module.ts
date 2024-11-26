import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './common/config/config.service';
import {AuthController} from "./controllers/auth.controller";
import {PhishingController} from "./controllers/phishing.controller";
import {UserController} from "./controllers/user.controller";
import {JwtModule} from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: (process.env.JWT_USER_SECRET as string) || 'phishing-secret',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: (process.env.JWT_USER_TOKEN_EXPIRES_IN as string) || '1d',
        issuer: 'iss',
      },
    })
  ],
  controllers: [AuthController, UserController, PhishingController],
  providers: [
    ConfigService,
    {
      provide: 'PHISHING_SIMULATOR',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('simulatorService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PHISHING_ATTEMPT',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('attemptService'));
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}
