import { Controller, Get, Param, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StockQueryDto } from './dto/stock-query.dto';
import { Stock } from './entities/stock.entity';

/**
 * Stocks controller
 * 
 * Handles HTTP requests for stock-related endpoints
 */
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  /**
   * Get all stocks with optional filtering
   * 
   * @param query Query parameters for filtering
   * @returns Array of stocks
   */
  @Get()
  getStocks(@Query() query: StockQueryDto): Promise<Stock[]> {
    return this.stocksService.getStocks(query);
  }

  /**
   * Get detailed information for a specific stock
   * 
   * @param symbol Stock symbol
   * @returns Stock details
   */
  @Get(':symbol')
  getStockBySymbol(@Param('symbol') symbol: string): Promise<Stock> {
    return this.stocksService.getStockBySymbol(symbol);
  }

  /**
   * Get market summary data
   * 
   * @returns Market indices data
   */
  @Get('market/summary')
  getMarketSummary() {
    return this.stocksService.getMarketSummary();
  }

  /**
   * Get historical price data for a stock
   * 
   * @param symbol Stock symbol
   * @param period Time period (e.g., '1d', '1w', '1m', '1y')
   * @returns Historical price data
   */
  @Get(':symbol/history')
  getStockHistory(
    @Param('symbol') symbol: string,
    @Query('period') period: string = '1m',
  ) {
    return this.stocksService.getStockHistory(symbol, period);
  }
}