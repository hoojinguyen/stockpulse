import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';

/**
 * Watchlist entity
 * 
 * Tracks stocks users are interested in.
 * Each entry represents a stock in a user's watchlist.
 */
@Entity()
export class Watchlist {
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
   * Optional note about the stock
   */
  @Column({ nullable: true })
  note: string;

  /**
   * Reference to the user who owns this watchlist item
   */
  @ManyToOne(() => User, (user) => user.watchlists)
  user: User;

  /**
   * Date when the stock was added to the watchlist
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Date when the watchlist item was last updated
   */
  @UpdateDateColumn()
  updatedAt: Date;
}