import { IsString, IsEmail, IsOptional, Length } from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(6, 100)
  password?: string;
}
