import { Controller, Get, Post, Body, Param, Delete, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ClerkAuthGuard } from '@modules/auth/clerk-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';
import { AddWatchlistItemDto } from './dto/add-watchlist-item.dto';
import { WatchlistsService } from './watchlists.service';

/**
 * Controller for managing watchlists
 * 
 * All routes are protected with ClerkAuthGuard
 */
@Controller('watchlists')
@UseGuards(ClerkAuthGuard) // Protect all routes in this controller
export class WatchlistsController {
  constructor(private readonly watchlistsService: WatchlistsService) {}
  /**
   * Get all watchlist items for the current user
   * 
   * @param user Current authenticated user
   * @returns List of watchlist items
   */
  @Get()
  async getAllWatchlistItems(@CurrentUser() user: any) {
    return this.watchlistsService.findAllByUserId(user.user.id);
  }

  /**
   * Add a stock to the watchlist
   * 
   * @param user Current authenticated user
   * @param addWatchlistItemDto Data for adding watchlist item
   * @returns Added watchlist item
   */
  @Post()
  async addToWatchlist(
    @CurrentUser() user: any,
    @Body() addWatchlistItemDto: AddWatchlistItemDto,
  ) {
    return this.watchlistsService.create(user.user.id, addWatchlistItemDto);
  }

  /**
   * Get a specific watchlist item
   * 
   * @param user Current authenticated user
   * @param id Watchlist item ID
   * @returns Watchlist item
   */
  @Get(':id')
  async getWatchlistItem(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return await this.watchlistsService.findOne(id, user.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Watchlist item with ID ${id} not found or does not belong to you`);
      }
      throw error;
    }
  }

  /**
   * Remove a stock from the watchlist
   * 
   * @param user Current authenticated user
   * @param id Watchlist item ID
   * @returns Removed watchlist item
   */
  @Delete(':id')
  async removeFromWatchlist(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return await this.watchlistsService.remove(id, user.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Watchlist item with ID ${id} not found or does not belong to you`);
      }
      throw error;
    }
  }
}