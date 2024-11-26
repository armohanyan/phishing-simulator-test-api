export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.ATTEMPT_SERVICE_PORT;
    this.envConfig.host = process.env.ATTEMPT_SERVICE_HOST;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
