import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Stock } from './entities/stock.entity';

/**
 * Stocks module
 * 
 * Provides stock-related functionality
 */
@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}