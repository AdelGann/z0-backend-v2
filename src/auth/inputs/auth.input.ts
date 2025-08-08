import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/user.dto';

export class LoginInput {
  @ApiProperty({
    description: 'User Email',
    example: 'john@example.com',
  })
  @IsEmail({})
  email!: string;

  @ApiProperty({
    description: 'User Password',
    example: 'Strong_Password@15025',
  })
  @IsString()
  password!: string;
}
export class RegisterInput extends CreateUserDto {
  @ApiProperty({
    description: 'Validate Password',
    example: 'Strong_Password@15025',
  })
  @IsStrongPassword()
  @IsString()
  repeat_password!: string;
}
