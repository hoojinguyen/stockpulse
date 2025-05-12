import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';

/**
 * Entity for storing watchlist items in the database
 */
@Entity('watchlist_items')
export class WatchlistItem {
  /**
   * Primary key
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Stock symbol (e.g., AAPL, MSFT)
   */
  @Column()
  symbol: string;

  /**
   * Optional note about the watchlist item
   */
  @Column({ nullable: true })
  note: string;

  /**
   * User who owns this watchlist item
   */
  @ManyToOne(() => User, user => user.watchlistItems)
  user: User;

  /**
   * User ID foreign key
   */
  @Column()
  userId: number;

  /**
   * Creation timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Last update timestamp
   */
  @UpdateDateColumn()
  updatedAt: Date;
}