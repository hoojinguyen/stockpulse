import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/**
 * Service for managing users
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Find a user by their Clerk ID
   * 
   * @param clerkId The Clerk user ID
   * @returns The user or null if not found
   */
  async findByClerkId(clerkId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { clerkId } });
  }

  /**
   * Find a user by their email
   * 
   * @param email The user's email
   * @returns The user or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Create a new user
   * 
   * @param userData The user data
   * @returns The created user
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  /**
   * Find a user by their Clerk ID or create a new one if not found
   * 
   * @param clerkId The Clerk user ID
   * @param email The user's email
   * @param name The user's name (optional)
   * @returns The found or created user
   */
  async findOrCreate(clerkId: string, email: string, name?: string): Promise<User> {
    let user = await this.findByClerkId(clerkId);
    
    if (!user) {
      // Check if a user with this email already exists
      const existingUser = await this.findByEmail(email);
      
      if (existingUser) {
        // If a user with this email exists but has a different clerkId,
        // update the clerkId
        existingUser.clerkId = clerkId;
        if (name) {
          existingUser.name = name;
        }
        return this.usersRepository.save(existingUser);
      }
      
      // Create a new user
      user = await this.create({
        clerkId,
        email,
        name,
      });
    }
    
    return user;
  }

  /**
   * Find a user by their ID
   * 
   * @param id The user ID
   * @returns The user or null if not found
   */
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Update a user
   * 
   * @param id The user ID
   * @param userData The updated user data
   * @returns The updated user
   */
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    return this.findById(id);
  }

  /**
   * Find all users
   * 
   * @returns List of all users
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}