import { Module } from '@nestjs/common';
import {PhishingModule} from "./modules/phishing/phishing.module";
import {JwtAuthGuard} from "./common/guards/jwt-auth.guard";

@Module({
  imports: [
    PhishingModule
  ],
  providers: [JwtAuthGuard],
  controllers: [],
})
export class AppModule {}
