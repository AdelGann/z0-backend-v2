import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    status: 400,
    description: 'No user founded',
  })
  @ApiResponse({
    status: 401,
    description: 'Incorrect Password',
  })
  @ApiResponse({
    status: 201,
    description: 'Logged in succesfully',
  })
  login(@Body() credentials: LoginDto) {
    return this.auth.Login(credentials);
  }

  @Post('/register')
  @ApiOperation({
    summary: 'Register',
  })
  @ApiResponse({
    status: 400,
    description: 'Email already taken',
  })
  @ApiResponse({
    status: 400,
    description: 'Username already taken',
  })
  @ApiResponse({
    status: 502,
    description: 'Something went wrong while hash',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered succesfully',
  })
  register(@Body() data: RegisterDto) {
    return this.auth.Register(data);
  }
}
