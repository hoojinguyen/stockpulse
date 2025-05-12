import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO for adding a stock to a user's watchlist
 */
export class AddWatchlistItemDto {
  /**
   * Stock symbol (e.g., AAPL, MSFT)
   */
  @IsNotEmpty()
  @IsString()
  symbol: string;

  /**
   * Optional note about the watchlist item
   */
  @IsString()
  note?: string;
}