import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';

/**
 * Portfolio entity
 * 
 * Stores user's stock holdings for portfolio tracking.
 * Optional for MVP but included in the initial schema design.
 */
@Entity()
export class Portfolio {
  /**
   * Primary key (auto-generated)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Stock symbol (e.g., "VNM.VN", "FPT.VN")
   */
  @Column()
  ticker: string;

  /**
   * Number of shares owned
   */
  @Column()
  quantity: number;

  /**
   * Price per share at purchase
   */
  @Column('float')
  purchasePrice: number;

  /**
   * Date of purchase
   */
  @Column({ nullable: true })
  purchaseDate: Date;

  /**
   * Reference to the user who owns this portfolio item
   */
  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  /**
   * Date when the portfolio item was created
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Date when the portfolio item was last updated
   */
  @UpdateDateColumn()
  updatedAt: Date;
}