import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

/**
 * Alpha Vantage API Service
 * 
 * Handles communication with the Alpha Vantage API for fetching stock data
 */
@Injectable()
export class AlphaVantageService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ALPHA_VANTAGE_API_KEY');
    if (!this.apiKey) {
      console.warn('ALPHA_VANTAGE_API_KEY is not set in environment variables');
    }
  }

  /**
   * Get stock quote data for a specific symbol
   * 
   * @param symbol Stock symbol
   * @returns Stock quote data
   */
  async getStockQuote(symbol: string): Promise<any> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: this.apiKey,
        },
      });

      if (response.data['Error Message']) {
        throw new HttpException(response.data['Error Message'], HttpStatus.BAD_REQUEST);
      }

      if (response.data['Note']) {
        console.warn('Alpha Vantage API limit reached:', response.data['Note']);
      }

      return response.data['Global Quote'];
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch stock quote from Alpha Vantage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get company overview data for a specific symbol
   * 
   * @param symbol Stock symbol
   * @returns Company overview data
   */
  async getCompanyOverview(symbol: string): Promise<any> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          function: 'OVERVIEW',
          symbol,
          apikey: this.apiKey,
        },
      });

      if (response.data['Error Message']) {
        throw new HttpException(response.data['Error Message'], HttpStatus.BAD_REQUEST);
      }

      if (Object.keys(response.data).length === 0) {
        throw new HttpException(`No data found for symbol ${symbol}`, HttpStatus.NOT_FOUND);
      }

      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch company overview from Alpha Vantage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get historical time series data for a specific symbol
   * 
   * @param symbol Stock symbol
   * @param interval Time interval (e.g., 'daily', 'weekly', 'monthly')
   * @returns Historical time series data
   */
  async getTimeSeries(symbol: string, interval: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<any> {
    try {
      const functionName = `TIME_SERIES_${interval.toUpperCase()}`;
      const response = await axios.get(this.baseUrl, {
        params: {
          function: functionName,
          symbol,
          outputsize: 'compact', // compact returns the latest 100 data points
          apikey: this.apiKey,
        },
      });

      if (response.data['Error Message']) {
        throw new HttpException(response.data['Error Message'], HttpStatus.BAD_REQUEST);
      }

      if (response.data['Note']) {
        console.warn('Alpha Vantage API limit reached:', response.data['Note']);
      }

      const timeSeriesKey = `Time Series (${interval === 'daily' ? 'Daily' : interval === 'weekly' ? 'Weekly' : 'Monthly'})`;
      const timeSeries = response.data[timeSeriesKey];

      if (!timeSeries) {
        throw new HttpException(`No time series data found for symbol ${symbol}`, HttpStatus.NOT_FOUND);
      }

      // Transform the data into a more usable format
      const formattedData = Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'], 10),
      }));

      return formattedData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch time series data from Alpha Vantage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Search for stocks by keywords
   * 
   * @param keywords Search keywords
   * @returns List of matching stocks
   */
  async searchStocks(keywords: string): Promise<any> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords,
          apikey: this.apiKey,
        },
      });

      if (response.data['Error Message']) {
        throw new HttpException(response.data['Error Message'], HttpStatus.BAD_REQUEST);
      }

      if (response.data['Note']) {
        console.warn('Alpha Vantage API limit reached:', response.data['Note']);
      }

      return response.data.bestMatches || [];
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to search stocks from Alpha Vantage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}