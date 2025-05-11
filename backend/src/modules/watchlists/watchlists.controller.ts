import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '@modules/auth/clerk-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';

/**
 * Controller for managing watchlists
 * 
 * All routes are protected with ClerkAuthGuard
 */
@Controller('watchlists')
@UseGuards(ClerkAuthGuard) // Protect all routes in this controller
export class WatchlistsController {
  /**
   * Get all watchlist items for the current user
   * 
   * @param user Current authenticated user
   * @returns List of watchlist items
   */
  @Get()
  async findAll(@CurrentUser() user: any) {
    // In a real implementation, you would inject and use a WatchlistsService
    // to fetch the watchlist items from the database
    return {
      message: `Fetching all watchlist items for user ${user.user.id}`,
      userId: user.user.id,
    };
  }

  /**
   * Add a stock to the user's watchlist
   * 
   * @param user Current authenticated user
   * @param createWatchlistDto Data for creating a watchlist item
   * @returns Created watchlist item
   */
  @Post()
  async create(@CurrentUser() user: any, @Body() createWatchlistDto: any) {
    return {
      message: `Adding stock to watchlist for user ${user.user.id}`,
      userId: user.user.id,
      data: createWatchlistDto,
    };
  }

  /**
   * Get a specific watchlist item
   * 
   * @param id Watchlist item ID
   * @param user Current authenticated user
   * @returns Watchlist item
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return {
      message: `Fetching watchlist item ${id} for user ${user.user.id}`,
      userId: user.user.id,
      itemId: id,
    };
  }

  /**
   * Remove a stock from the user's watchlist
   * 
   * @param id Watchlist item ID
   * @param user Current authenticated user
   * @returns Removed watchlist item
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return {
      message: `Removing watchlist item ${id} for user ${user.user.id}`,
      userId: user.user.id,
      itemId: id,
    };
  }
}