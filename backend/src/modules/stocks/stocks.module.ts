import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Stock } from './entities/stock.entity';
import { AlphaVantageService } from './providers/alpha-vantage.service';
import { ConfigModule } from '@nestjs/config';

/**
 * Stocks module
 * 
 * Provides stock-related functionality
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    ConfigModule,
  ],
  controllers: [StocksController],
  providers: [StocksService, AlphaVantageService],
  exports: [StocksService, AlphaVantageService],
})
export class StocksModule {}