import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Theme, NotificationFrequency } from '../dto/update-preferences.dto';

/**
 * User Preferences entity
 * 
 * Stores user-specific settings and preferences
 */
@Entity()
export class UserPreferences {
  /**
   * Primary key (auto-generated)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User's preferred theme
   */
  @Column({
    type: 'enum',
    enum: Theme,
    default: Theme.SYSTEM,
  })
  theme: Theme;

  /**
   * User's notification frequency preference
   */
  @Column({
    type: 'enum',
    enum: NotificationFrequency,
    default: NotificationFrequency.DAILY,
  })
  notificationFrequency: NotificationFrequency;

  /**
   * Whether to receive email notifications
   */
  @Column({ default: true })
  emailNotifications: boolean;

  /**
   * Default currency for displaying financial data
   */
  @Column({ default: 'VND' })
  defaultCurrency: string;

  /**
   * User role (for role-based access control)
   */
  @Column({ default: 'user' })
  role: string;

  /**
   * Reference to the user
   */
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * User ID (foreign key)
   */
  @Column({ name: 'user_id' })
  userId: number;
}