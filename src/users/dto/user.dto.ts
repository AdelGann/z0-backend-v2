import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(3)
  full_name!: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'johndoe',
  })
  @IsString()
  @MinLength(3)
  user_name!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
  })
  @IsEmail({})
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password123!',
  })
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  password!: string;
}

// User can only update full_name, email and his username
export class UpdateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @MinLength(3)
  full_name?: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @MinLength(3)
  user_name?: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
    required: false,
  })
  @IsEmail({})
  email?: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'New user password',
    example: 'NewPassword123!',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
