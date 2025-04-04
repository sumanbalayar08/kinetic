import {
  IsString,
  Length,
  IsOptional,
  IsISO8601,
  IsMongoId,
} from '@nestjs/class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsISO8601()
  deadline?: Date;

  @IsMongoId()
  @IsOptional()
  user?: string;
}
