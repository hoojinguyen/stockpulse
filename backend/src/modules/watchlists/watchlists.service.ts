import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { AddWatchlistItemDto } from './dto/add-watchlist-item.dto';

/**
 * Service for managing watchlist operations
 */
@Injectable()
export class WatchlistsService {
  constructor(
    @InjectRepository(WatchlistItem)
    private watchlistItemRepository: Repository<WatchlistItem>,
  ) {}

  /**
   * Get all watchlist items for a user
   * 
   * @param userId User ID
   * @returns List of watchlist items
   */
  async findAllByUserId(userId: number): Promise<WatchlistItem[]> {
    return this.watchlistItemRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a specific watchlist item
   * 
   * @param id Watchlist item ID
   * @param userId User ID (for authorization)
   * @returns Watchlist item
   */
  async findOne(id: number, userId: number): Promise<WatchlistItem> {
    const watchlistItem = await this.watchlistItemRepository.findOne({
      where: { id, userId },
    });

    if (!watchlistItem) {
      throw new NotFoundException(`Watchlist item with ID ${id} not found`);
    }

    return watchlistItem;
  }

  /**
   * Add a stock to the user's watchlist
   * 
   * @param userId User ID
   * @param addWatchlistItemDto Data for adding watchlist item
   * @returns Created watchlist item
   */
  async create(userId: number, addWatchlistItemDto: AddWatchlistItemDto): Promise<WatchlistItem> {
    const watchlistItem = this.watchlistItemRepository.create({
      ...addWatchlistItemDto,
      userId,
    });

    return this.watchlistItemRepository.save(watchlistItem);
  }

  /**
   * Remove a stock from the user's watchlist
   * 
   * @param id Watchlist item ID
   * @param userId User ID (for authorization)
   * @returns Removed watchlist item
   */
  async remove(id: number, userId: number): Promise<WatchlistItem> {
    const watchlistItem = await this.findOne(id, userId);
    return this.watchlistItemRepository.remove(watchlistItem);
  }
}