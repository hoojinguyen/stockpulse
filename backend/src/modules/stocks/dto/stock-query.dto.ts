import { IsOptional, IsString } from 'class-validator';

/**
 * Stock query DTO
 * 
 * Used for filtering stock requests
 */
export class StockQueryDto {
  @IsOptional()
  @IsString()
  market?: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsString()
  search?: string;
}