import {Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {catchError, firstValueFrom, timeout} from "rxjs";
import {SignUpDto} from "../common/interfaces/simulator/auth/dto/sign-up.dto";
import {SignInDto} from "../common/interfaces/simulator/auth/dto/sign-in.dto";
import {ClientProxy} from "@nestjs/microservices";
import {IUserPayload} from "../common/interfaces/simulator/user/user-payload.interface";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
      @Inject('PHISHING_SIMULATOR') private readonly simulatorClient: ClientProxy,
  ) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string; status: number }> {
    try {
      return await firstValueFrom(
          this.simulatorClient
              .send('sign-up', signUpDto)
              .pipe(
                  timeout(5000),
                  catchError((error) => {
                    if (error?.type) {
                      if (error.type === 'CONFLICT') {
                        throw new HttpException(error.message, HttpStatus.CONFLICT);
                      }
                      if (error.type === 'INTERNAL_ERROR') {
                        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
                      }
                    }

                    if (error.name === 'TimeoutError') {
                      throw new HttpException(
                          'Microservice timeout',
                          HttpStatus.REQUEST_TIMEOUT,
                      );
                    }

                    throw new HttpException(
                        'Internal server error',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                  }),
              ),
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Authenticate user and return a token' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 408, description: 'Microservice timeout' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(200)
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ access_token: string; data: IUserPayload }> {
    try {
      return await firstValueFrom(
          this.simulatorClient
              .send('sign-in', signInDto)
              .pipe(
                  timeout(5000),
                  catchError((error) => {
                    if (error?.type) {
                      if (error.type === 'UNAUTHORIZED') {
                        throw new HttpException(
                            error.message || 'Invalid credentials',
                            HttpStatus.UNAUTHORIZED,
                        );
                      }
                      if (error.type === 'BAD_REQUEST') {
                        throw new HttpException(
                            error.message || 'Bad request',
                            HttpStatus.BAD_REQUEST,
                        );
                      }
                    }

                    if (error.name === 'TimeoutError') {
                      throw new HttpException(
                          'Microservice timeout',
                          HttpStatus.REQUEST_TIMEOUT,
                      );
                    }
                    throw new HttpException(
                        'Internal server error',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                  }),
              ),
      );
    } catch (error) {
      throw error;
    }
  }
}
