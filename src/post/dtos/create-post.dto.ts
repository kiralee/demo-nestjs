import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

   @ApiProperty()
  @IsNumber()
  @IsNotEmpty() 
  userId: number;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  metaTitle: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  summary: string;

	createAt: Date;
	
	updateAt: Date;
}
