import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for creating a portfolio item
 */
export class CreatePortfolioDto {
  /**
   * Stock symbol (e.g., VNM.VN, FPT.VN)
   */
  @IsNotEmpty()
  @IsString()
  ticker: string;

  /**
   * Number of shares owned
   */
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  /**
   * Price per share at purchase
   */
  @IsNotEmpty()
  @IsNumber()
  purchasePrice: number;

  /**
   * Date of purchase (optional)
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  purchaseDate?: Date;
}