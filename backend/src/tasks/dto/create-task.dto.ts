import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsISO8601,
  IsMongoId,
} from '@nestjs/class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Deadline is required' })
  @IsISO8601({ message: 'Deadline must be a valid date (ISO8601 format)' })
  deadline: Date;

  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
