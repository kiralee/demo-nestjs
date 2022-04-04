import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Max, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  metaTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @Length(10, 255)
  content: string;
}
