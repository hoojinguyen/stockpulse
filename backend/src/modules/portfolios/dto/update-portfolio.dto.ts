import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for updating a portfolio item
 */
export class UpdatePortfolioDto {
  /**
   * Stock symbol (e.g., VNM.VN, FPT.VN)
   */
  @IsOptional()
  @IsString()
  ticker?: string;

  /**
   * Number of shares owned
   */
  @IsOptional()
  @IsNumber()
  quantity?: number;

  /**
   * Price per share at purchase
   */
  @IsOptional()
  @IsNumber()
  purchasePrice?: number;

  /**
   * Date of purchase
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  purchaseDate?: Date;
}