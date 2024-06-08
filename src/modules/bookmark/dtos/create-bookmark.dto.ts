import { IsEnum, IsJSON, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BookmarkType } from '../enums/bookmarkType';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsString({
    message: 'you must provide a description'
  })
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @IsEnum(BookmarkType)
  type: BookmarkType;

  @IsOptional()
  @IsObject()
  data?: {}
}