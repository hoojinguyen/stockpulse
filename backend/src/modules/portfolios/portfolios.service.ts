import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

/**
 * Service for managing portfolio operations
 */
@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  /**
   * Get all portfolio items for a user
   * 
   * @param userId User ID
   * @returns List of portfolio items
   */
  async findAllByUserId(userId: number): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a specific portfolio item
   * 
   * @param id Portfolio item ID
   * @param userId User ID (for authorization)
   * @returns Portfolio item
   */
  async findOne(id: number, userId: number): Promise<Portfolio> {
    const portfolioItem = await this.portfolioRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!portfolioItem) {
      throw new NotFoundException(`Portfolio item with ID ${id} not found`);
    }

    return portfolioItem;
  }

  /**
   * Add a stock to the user's portfolio
   * 
   * @param userId User ID
   * @param createPortfolioDto Data for creating portfolio item
   * @returns Created portfolio item
   */
  async create(userId: number, createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const portfolioItem = this.portfolioRepository.create({
      ...createPortfolioDto,
      user: { id: userId },
    });

    return this.portfolioRepository.save(portfolioItem);
  }

  /**
   * Update a portfolio item
   * 
   * @param id Portfolio item ID
   * @param userId User ID (for authorization)
   * @param updatePortfolioDto Data for updating portfolio item
   * @returns Updated portfolio item
   */
  async update(
    id: number,
    userId: number,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    // Check if portfolio item exists and belongs to user
    const portfolioItem = await this.findOne(id, userId);

    // Update portfolio item
    Object.assign(portfolioItem, updatePortfolioDto);
    return this.portfolioRepository.save(portfolioItem);
  }

  /**
   * Remove a stock from the user's portfolio
   * 
   * @param id Portfolio item ID
   * @param userId User ID (for authorization)
   * @returns Removed portfolio item
   */
  async remove(id: number, userId: number): Promise<Portfolio> {
    const portfolioItem = await this.findOne(id, userId);
    return this.portfolioRepository.remove(portfolioItem);
  }
}