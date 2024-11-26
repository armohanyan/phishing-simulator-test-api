import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.simulatorService = {
      options: {
        port: process.env.SIMULATOR_SERVICE_PORT,
        host: process.env.SIMULATOR_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.attemptService = {
      options: {
        port: process.env.ATTEMPT_SERVICE_PORT,
        host: process.env.ATTEMPT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
