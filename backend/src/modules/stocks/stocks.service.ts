import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { StockQueryDto } from './dto/stock-query.dto';
import { AlphaVantageService } from './providers/alpha-vantage.service';

/**
 * Stocks service
 * 
 * Handles business logic for stock-related operations
 */
@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
    private alphaVantageService: AlphaVantageService,
  ) {}

  /**
   * Get all stocks with optional filtering
   * 
   * @param query Query parameters for filtering
   * @returns Array of stocks
   */
  async getStocks(query: StockQueryDto): Promise<Stock[]> {
    const queryBuilder = this.stocksRepository.createQueryBuilder('stock');
    
    if (query.market) {
      queryBuilder.andWhere('stock.market = :market', { market: query.market });
    }
    
    if (query.sector) {
      queryBuilder.andWhere('stock.sector = :sector', { sector: query.sector });
    }
    
    if (query.search) {
      queryBuilder.andWhere(
        '(stock.symbol ILIKE :search OR stock.name ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }
    
    return queryBuilder.getMany();
  }

  /**
   * Get detailed information for a specific stock
   * 
   * @param symbol Stock symbol
   * @returns Stock details
   */
  async getStockBySymbol(symbol: string): Promise<Stock> {
    try {
      // Try to get real-time data from Alpha Vantage
      const quoteData = await this.alphaVantageService.getStockQuote(symbol);
      const overviewData = await this.alphaVantageService.getCompanyOverview(symbol);
      
      // Find or create stock in database
      let stock = await this.stocksRepository.findOne({ where: { symbol } });
      
      if (!stock) {
        stock = new Stock();
        stock.symbol = symbol;
      }
      
      // Update stock with real-time data
      if (quoteData) {
        stock.name = overviewData?.Name || stock.name || symbol;
        stock.price = parseFloat(quoteData['05. price']) || stock.price;
        stock.change = parseFloat(quoteData['09. change']) || stock.change;
        stock.percentChange = parseFloat(quoteData['10. change percent']) || stock.percentChange;
        stock.volume = quoteData['06. volume'] || stock.volume;
        
        if (overviewData) {
          stock.market = overviewData.Exchange || stock.market;
          stock.sector = overviewData.Sector || stock.sector;
          stock.industry = overviewData.Industry || stock.industry;
          stock.marketCap = overviewData.MarketCapitalization || stock.marketCap;
          stock.peRatio = overviewData.PERatio || stock.peRatio;
          stock.dividendYield = overviewData.DividendYield || stock.dividendYield;
          stock.eps = overviewData.EPS || stock.eps;
          stock.high52Week = overviewData['52WeekHigh'] || stock.high52Week;
          stock.low52Week = overviewData['52WeekLow'] || stock.low52Week;
        }
        
        // Save updated stock data
        await this.stocksRepository.save(stock);
      }
      
      if (!stock) {
        throw new NotFoundException(`Stock with symbol ${symbol} not found`);
      }
      
      return stock;
    } catch (error) {
      // Fallback to database if API fails
      const stock = await this.stocksRepository.findOne({ where: { symbol } });
      
      if (!stock) {
        throw new NotFoundException(`Stock with symbol ${symbol} not found`);
      }
      
      return stock;
    }
  }

  /**
   * Get market summary data
   * 
   * @returns Market indices data
   */
  async getMarketSummary(): Promise<any> {
    // In a real implementation, this would fetch data from an external API
    // or aggregate data from the database
    return {
      indices: [
        { name: 'VN-Index', value: 1200.45, change: 5.23, percentChange: 0.43 },
        { name: 'HNX-Index', value: 230.12, change: -1.05, percentChange: -0.45 },
      ],
      timestamp: new Date(),
    };
  }

  /**
   * Get historical price data for a stock
   * 
   * @param symbol Stock symbol
   * @param period Time period (e.g., '1d', '1w', '1m', '1y')
   * @returns Historical price data
   */
  async getStockHistory(symbol: string, period: string): Promise<any> {
    // Verify the stock exists
    await this.getStockBySymbol(symbol);
    
    try {
      // Map period to Alpha Vantage interval
      let interval: 'daily' | 'weekly' | 'monthly' = 'daily';
      
      if (period === '1w' || period === 'weekly') {
        interval = 'weekly';
      } else if (period === '1m' || period === 'monthly') {
        interval = 'monthly';
      }
      
      // Fetch historical data from Alpha Vantage
      const historicalData = await this.alphaVantageService.getTimeSeries(symbol, interval);
      
      return {
        symbol,
        period,
        data: historicalData,
      };
    } catch (error) {
      // Fallback to mock data if API fails
      console.error(`Failed to fetch historical data for ${symbol}:`, error);
      
      return {
        symbol,
        period,
        data: [
          { date: '2023-01-01', open: 100, high: 105, low: 98, close: 103, volume: 1000000 },
          { date: '2023-01-02', open: 103, high: 107, low: 102, close: 106, volume: 1200000 },
          // More data points would be included here
        ],
        source: 'mock', // Indicate this is mock data
      };
    }
  }
}