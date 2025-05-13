import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Stock entity
 * 
 * Stores stock information for the application.
 */
@Entity()
export class Stock {
  /**
   * Primary key (auto-generated)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Stock symbol (e.g., "VNM", "FPT")
   */
  @Column({ unique: true })
  symbol: string;

  /**
   * Company name
   */
  @Column()
  name: string;

  /**
   * Current stock price
   */
  @Column('float', { nullable: true })
  price: number;

  /**
   * Price change
   */
  @Column('float', { nullable: true })
  change: number;

  /**
   * Percentage price change
   */
  @Column('float', { nullable: true })
  percentChange: number;

  /**
   * Trading volume
   */
  @Column({ nullable: true })
  volume: string;

  /**
   * Market capitalization
   */
  @Column({ nullable: true })
  marketCap: string;

  /**
   * Price-to-earnings ratio
   */
  @Column('float', { nullable: true })
  peRatio: number;

  /**
   * Stock market (e.g., "HOSE", "HNX", "UPCOM", "NYSE", "NASDAQ")
   */
  @Column({ nullable: true })
  market: string;

  /**
   * Industry sector
   */
  @Column({ nullable: true })
  sector: string;

  /**
   * Industry
   */
  @Column({ nullable: true })
  industry: string;

  /**
   * Dividend yield
   */
  @Column('float', { nullable: true })
  dividendYield: number;

  /**
   * Earnings per share
   */
  @Column('float', { nullable: true })
  eps: number;

  /**
   * 52-week high price
   */
  @Column('float', { nullable: true })
  high52Week: number;

  /**
   * 52-week low price
   */
  @Column('float', { nullable: true })
  low52Week: number;

  /**
   * Last updated timestamp
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Creation timestamp
   */
  @CreateDateColumn()
  createdAt: Date;
}