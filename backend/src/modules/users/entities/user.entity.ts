import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Watchlist } from '@modules/watchlists/entities/watchlist.entity';
import { Portfolio } from '@modules/portfolios/entities/portfolio.entity';
import { UserPreferences } from './user-preferences.entity';

/**
 * User entity
 * 
 * Stores user information, linked to Clerk's user ID for authentication.
 * Contains minimal data since Clerk handles most user management.
 */
@Entity()
export class User {
  /**
   * Primary key (auto-generated)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User's email (unique)
   */
  @Column({ unique: true })
  email: string;

  /**
   * User's name (optional)
   */
  @Column({ nullable: true })
  name: string;

  /**
   * Clerk user ID for authentication
   */
  @Column({ unique: true })
  clerkId: string;

  /**
   * User's watchlists
   */
  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlists: Watchlist[];

  /**
   * User's portfolios
   */
  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];

  /**
   * User's preferences
   */
  @OneToOne(() => UserPreferences, (preferences) => preferences.user)
  preferences: UserPreferences;
}