import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ClerkAuthGuard } from '@modules/auth/clerk-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

/**
 * Controller for managing portfolios
 * 
 * All routes are protected with ClerkAuthGuard
 */
@Controller('portfolios')
@UseGuards(ClerkAuthGuard) // Protect all routes in this controller
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  /**
   * Get all portfolio items for the current user
   * 
   * @param user Current authenticated user
   * @returns List of portfolio items
   */
  @Get()
  async getAllPortfolioItems(@CurrentUser() user: any) {
    return this.portfoliosService.findAllByUserId(user.user.id);
  }

  /**
   * Add a stock to the portfolio
   * 
   * @param user Current authenticated user
   * @param createPortfolioDto Data for creating portfolio item
   * @returns Created portfolio item
   */
  @Post()
  async addToPortfolio(
    @CurrentUser() user: any,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    return this.portfoliosService.create(user.user.id, createPortfolioDto);
  }

  /**
   * Get a specific portfolio item
   * 
   * @param user Current authenticated user
   * @param id Portfolio item ID
   * @returns Portfolio item
   */
  @Get(':id')
  async getPortfolioItem(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return await this.portfoliosService.findOne(id, user.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Portfolio item with ID ${id} not found or does not belong to you`);
      }
      throw error;
    }
  }

  /**
   * Update a portfolio item
   * 
   * @param user Current authenticated user
   * @param id Portfolio item ID
   * @param updatePortfolioDto Data for updating portfolio item
   * @returns Updated portfolio item
   */
  @Put(':id')
  async updatePortfolioItem(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    try {
      return await this.portfoliosService.update(id, user.user.id, updatePortfolioDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Portfolio item with ID ${id} not found or does not belong to you`);
      }
      throw error;
    }
  }

  /**
   * Remove a stock from the portfolio
   * 
   * @param user Current authenticated user
   * @param id Portfolio item ID
   * @returns Removed portfolio item
   */
  @Delete(':id')
  async removeFromPortfolio(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return await this.portfoliosService.remove(id, user.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Portfolio item with ID ${id} not found or does not belong to you`);
      }
      throw error;
    }
  }
}