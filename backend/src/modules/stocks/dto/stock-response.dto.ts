import { Exclude, Expose } from 'class-transformer';

/**
 * Stock response DTO
 * 
 * Used for returning stock data to the frontend
 */
@Exclude()
export class StockResponseDto {
  @Expose()
  symbol: string;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  change: number;

  @Expose()
  percentChange: number;

  @Expose()
  volume: string;

  @Expose()
  marketCap: string;

  @Expose()
  peRatio: number;

  @Expose()
  market?: string;

  @Expose()
  sector?: string;
}