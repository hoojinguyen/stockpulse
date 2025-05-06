# StockPulse NestJS Backend Setup Guide

## 1. Introduction

**Project Name**: StockPulse  
**Version**: 1.0  
**Date**: May 3, 2025  
**Prepared by**: Grok, Solution Architect  

StockPulse is a web application designed to aggregate financial news, display stock market data, and provide educational content on long-term investment strategies, primarily for retail investors in Vietnam. This document provides a comprehensive guide to building the backend service for StockPulse using [NestJS](https://nestjs.com/), a scalable Node.js framework. It covers setting up the database, defining the schema, structuring the NestJS project folder, and selecting necessary packages and libraries. Tailored to your expertise as a software engineer with frontend skills in Next.js and Tailwind CSS, this guide ensures a manageable learning curve while creating a robust backend that integrates with Clerk for authentication and external APIs like NewsAPI and Yahoo Finance.

## 2. Setting Up the Database

StockPulse requires a relational database to store user information and watchlists, with potential future support for portfolio tracking. PostgreSQL is chosen for its robustness, scalability, and compatibility with NestJS through TypeORM.

### 2.1 Prerequisites
- **Node.js**: Version 18 or higher, installed from [Node.js](https://nodejs.org/).
- **PostgreSQL**: Install locally from [PostgreSQL](https://www.postgresql.org/download/) or use Docker.
- **Docker (Optional)**: For containerized PostgreSQL setup, install from [Docker](https://www.docker.com/get-started).
- **NestJS CLI**: Install globally:
  ```
  npm install -g @nestjs/cli
  ```

### 2.2 Steps to Set Up PostgreSQL

1. **Option 1: Local PostgreSQL Installation**
   - Install PostgreSQL and create a database named `stockpulse_db`.
   - Update PostgreSQL configuration to allow local connections.
   - Note your username and password for configuration.

2. **Option 2: PostgreSQL with Docker**
   - Create a `docker-compose.yml` file in your project root:
     ```yaml
     version: '3.8'
     services:
       postgres:
         image: postgres:latest
         environment:
           POSTGRES_USER: stockpulse_user
           POSTGRES_PASSWORD: stockpulse_pass
           POSTGRES_DB: stockpulse_db
         ports:
           - '5432:5432'
         volumes:
           - postgres_data:/var/lib/postgresql/data
     volumes:
       postgres_data:
     ```
   - Run the container:
     ```
     docker-compose up -d
     ```
   - Verify the database is running using a tool like [pgAdmin](https://www.pgadmin.org/) or `psql`.

3. **Install Database Dependencies**
   - In your NestJS project, install TypeORM and the PostgreSQL driver:
     ```
     npm install --save @nestjs/typeorm typeorm pg
     ```
   - Install `@nestjs/config` for environment variable management:
     ```
     npm install --save @nestjs/config
     ```

4. **Configure Database Connection**
   - Create a `.env` file in the project root:
     ```
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     POSTGRES_USER=stockpulse_user
     POSTGRES_PASSWORD=stockpulse_pass
     POSTGRES_DB=stockpulse_db
     ```
   - Update `app.module.ts` to configure TypeORM:
     ```typescript
     import { Module } from '@nestjs/common';
     import { TypeOrmModule } from '@nestjs/typeorm';
     import { ConfigModule } from '@nestjs/config';

     @Module({
       imports: [
         ConfigModule.forRoot(),
         TypeOrmModule.forRoot({
           type: 'postgres',
           host: process.env.POSTGRES_HOST,
           port: parseInt(process.env.POSTGRES_PORT),
           username: process.env.POSTGRES_USER,
           password: process.env.POSTGRES_PASSWORD,
           database: process.env.POSTGRES_DB,
           entities: [__dirname + '/**/*.entity{.ts,.js}'],
           synchronize: true, // Set to false in production
         }),
       ],
     })
     export class AppModule {}
     ```

5. **Test the Connection**
   - Run the NestJS application:
     ```
     npm run start
     ```
   - Check the console for connection errors. Use pgAdmin to verify the `stockpulse_db` database exists.

### 2.3 Notes
- The `synchronize: true` setting automatically creates database tables based on entities but should be disabled in production to prevent unintended schema changes.
- Consider using TypeORM migrations for production environments, as outlined in [Using TypeORM Migration in NestJS](https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75).

## 3. Defining the Database Schema

The schema supports StockPulse’s core features: user management, watchlists, and optional portfolio tracking. TypeORM’s decorators simplify entity definitions and relationships.

### 3.1 Entities

#### User Entity
- **Purpose**: Stores user information, linked to Clerk’s user ID for authentication.
- **Fields**:
  - `id`: Primary key (auto-generated).
  - `email`: User’s email (unique).
  - `name`: User’s name (optional).
- **Relationships**: One-to-many with `Watchlist` and `Portfolio`.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Watchlist } from './watchlist.entity';
import { Portfolio } from './portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlists: Watchlist[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
```

#### Watchlist Entity
- **Purpose**: Tracks stocks users are interested in.
- **Fields**:
  - `id`: Primary key (auto-generated).
  - `user`: Foreign key referencing `User`.
  - `ticker`: Stock symbol (e.g., "VNM.VN", "FPT.VN").
- **Relationships**: Many-to-one with `User`.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchlists)
  user: User;

  @Column()
  ticker: string;
}
```

#### Portfolio Entity (Optional)
- **Purpose**: Stores user’s stock holdings for portfolio tracking.
- **Fields**:
  - `id`: Primary key (auto-generated).
  - `user`: Foreign key referencing `User`.
  - `ticker`: Stock symbol.
  - `quantity`: Number of shares.
  - `purchasePrice`: Price per share at purchase.
- **Relationships**: Many-to-one with `User`.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @Column()
  ticker: string;

  @Column()
  quantity: number;

  @Column('float')
  purchasePrice: number;
}
```

### 3.2 Schema Notes
- **Clerk Integration**: Since Clerk handles authentication, the `User` entity stores minimal data (e.g., email, name) and uses Clerk’s user ID for linking to watchlists and portfolios.
- **Scalability**: The schema is simple but extensible for future features like portfolio performance metrics or transaction history.
- **Data Integrity**: Use `@Column({ unique: true })` for `email` to prevent duplicates and ensure referential integrity with foreign keys.

## 4. NestJS Folder Structure

NestJS’s modular architecture promotes separation of concerns, making it ideal for StockPulse’s backend. Below is a recommended folder structure:

```
src/
├── app.module.ts
├── main.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── clerk.strategy.ts
│   │   └── clerk-auth.guard.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   ├── watchlists/
│   │   ├── watchlists.module.ts
│   │   ├── watchlists.controller.ts
│   │   ├── watchlists.service.ts
│   │   └── entities/
│   │       └── watchlist.entity.ts
│   ├── portfolios/
│   │   ├── portfolios.module.ts
│   │   ├── portfolios.controller.ts
│   │   ├── portfolios.service.ts
│   │   └── entities/
│   │       └── portfolio.entity.ts
│   └── stocks/
│       ├── stocks.module.ts
│       ├── stocks.controller.ts
│       └── stocks.service.ts
├── providers/
│   └── clerk-client.provider.ts
├── shared/
│   ├── dto/
│   │   ├── create-watchlist.dto.ts
│   │   └── create-portfolio.dto.ts
│   ├── interceptors/
│   └── pipes/
└── app.controller.ts
```

### Folder Structure Explanation
| **Directory** | **Purpose** |
|---------------|-------------|
| `app.module.ts` | Root module that imports all other modules. |
| `main.ts` | Entry point for the NestJS application. |
| `modules/auth/` | Handles Clerk authentication, including strategy and guard. |
| `modules/users/` | Manages user-related operations (e.g., retrieving user data). |
| `modules/watchlists/` | Handles watchlist CRUD operations. |
| `modules/portfolios/` | Manages portfolio tracking (optional). |
| `modules/stocks/` | Fetches and processes stock and news data from external APIs. |
| `providers/` | Stores global providers like the Clerk client. |
| `shared/dto/` | Defines Data Transfer Objects for request validation. |
| `shared/interceptors/` | Custom interceptors for logging or response transformation. |
| `shared/pipes/` | Custom pipes for data validation or transformation. |

## 5. Packages and Libraries

The following packages and libraries are essential for building the StockPulse backend:

### 5.1 Core NestJS Packages
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `@nestjs/common` | Core NestJS utilities | Included with NestJS |
| `@nestjs/core` | NestJS runtime | Included with NestJS |
| `@nestjs/platform-express` | Express-based HTTP server | Included with NestJS |

### 5.2 Database and ORM
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `@nestjs/typeorm` | Integrates TypeORM with NestJS | `npm install --save @nestjs/typeorm` |
| `typeorm` | ORM for database operations | `npm install --save typeorm` |
| `pg` | PostgreSQL driver | `npm install --save pg` |

### 5.3 Configuration
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `@nestjs/config` | Manages environment variables | `npm install --save @nestjs/config` |

### 5.4 Authentication
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `@clerk/backend` | Clerk’s backend SDK for authentication | `npm install --save @clerk/backend` |
| `@nestjs/passport` | Passport integration for NestJS | `npm install --save @nestjs/passport` |
| `passport` | Authentication middleware | `npm install --save passport` |
| `passport-custom` | Custom Passport strategies | `npm install --save passport-custom` |

### 5.5 External API Integration
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `@nestjs/axios` | HTTP requests to external APIs | `npm install --save @nestjs/axios` |
| `yahoo-finance2` | Fetches stock data | `npm install --save yahoo-finance2` |

### 5.6 Validation
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `class-validator` | Validates DTOs | `npm install --save class-validator` |
| `class-transformer` | Transforms objects to class instances | `npm install --save class-transformer` |

### 5.7 Optional (for Advanced Features)
| **Package** | **Purpose** | **Installation** |
|-------------|-------------|------------------|
| `@nestjs/websockets` | Real-time updates via WebSockets | `npm install --save @nestjs/websockets` |
| `redis` | Caching with Redis | `npm install --save redis` |

### Installation Command
Run the following to install all core dependencies:
```
npm install --save @nestjs/typeorm typeorm pg @nestjs/config @clerk/backend @nestjs/passport passport passport-custom @nestjs/axios yahoo-finance2 class-validator class-transformer
```

## 6. Implementing Key Backend Features

### 6.1 Authentication with Clerk
Clerk handles user authentication, and the backend verifies user identities using Clerk’s JWT tokens.

#### Steps
1. **Set Up Clerk**:
   - Create a Clerk application at [Clerk](https://clerk.com/) and obtain `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
   - Add to `.env`:
     ```
     CLERK_PUBLISHABLE_KEY=your_publishable_key
     CLERK_SECRET_KEY=your_secret_key
     ```

2. **Create Clerk Client Provider**:
   ```typescript
   // src/providers/clerk-client.provider.ts
   import { Provider } from '@nestjs/common';
   import { ConfigService } from '@nestjs/config';
   import { createClerkClient } from '@clerk/backend';

   export const ClerkClientProvider: Provider = {
     provide: 'CLERK_CLIENT',
     useFactory: (configService: ConfigService) => {
       return createClerkClient({
         publishableKey: configService.get('CLERK_PUBLISHABLE_KEY'),
         secretKey: configService.get('CLERK_SECRET_KEY'),
       });
     },
     inject: [ConfigService],
   };
   ```

3. **Implement Clerk Strategy**:
   ```typescript
   // src/auth/clerk.strategy.ts
   import { Injectable } from '@nestjs/common';
   import { PassportStrategy } from '@nestjs/passport';
   import { Strategy } from 'passport-custom';
   import { Inject } from '@nestjs/common';

   @Injectable()
   export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
     constructor(@Inject('CLERK_CLIENT') private readonly clerkClient: any) {
       super();
     }

     async validate(req: any) {
       const token = req.headers.authorization?.split(' ')[1];
       if (!token) {
         throw new Error('No token provided');
       }
       const { userId } = await this.clerkClient.verifyToken(token);
       return { userId };
     }
   }
   ```

4. **Set Up Auth Module**:
   ```typescript
   // src/auth/auth.module.ts
   import { Module } from '@nestjs/common';
   import { PassportModule } from '@nestjs/passport';
   import { ClerkStrategy } from './clerk.strategy';
   import { ClerkClientProvider } from '../providers/clerk-client.provider';

   @Module({
     imports: [PassportModule],
     providers: [ClerkStrategy, ClerkClientProvider],
     exports: [ClerkStrategy],
   })
   export class AuthModule {}
   ```

5. **Create Authentication Guard**:
   ```typescript
   // src/auth/clerk-auth.guard.ts
   import { Injectable } from '@nestjs/common';
   import { AuthGuard } from '@nestjs/passport';

   @Injectable()
   export class ClerkAuthGuard extends AuthGuard('clerk') {}
   ```

6. **Protect Routes**:
   ```typescript
   // src/watchlists/watchlists.controller.ts
   import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
   import { WatchlistsService } from './watchlists.service';
   import { CreateWatchlistDto } from '../shared/dto/create-watchlist.dto';
   import { ClerkAuthGuard } from '../auth/clerk-auth.guard';

   @Controller('watchlists')
   export class WatchlistsController {
     constructor(private readonly watchlistsService: WatchlistsService) {}

     @Get()
     @UseGuards(ClerkAuthGuard)
     getWatchlists() {
       return this.watchlistsService.findAll();
     }

     @Post()
     @UseGuards(ClerkAuthGuard)
     createWatchlist(@Body() createWatchlistDto: CreateWatchlistDto) {
       return this.watchlistsService.create(createWatchlistDto);
     }
   }
   ```

### 6.2 Fetching External Data

#### NewsAPI
- Fetch news using `@nestjs/axios`:
  ```typescript
  // src/stocks/stocks.service.ts
  import { Injectable } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';
  import { firstValueFrom } from 'rxjs';

  @Injectable()
  export class StocksService {
    constructor(private readonly httpService: HttpService) {}

    async getNews() {
      const { data } = await firstValueFrom(
        this.httpService.get('https://newsapi.org/v2/top-headlines', {
          params: {
            apiKey: process.env.NEWS_API_KEY,
            category: 'business',
            country: 'vn',
          },
        }),
      );
      return data.articles;
    }
  }
  ```

#### Yahoo Finance
- Fetch stock data using `yahoo-finance2`:
  ```typescript
  import * as yahooFinance from 'yahoo-finance2';

  @Injectable()
  export class StocksService {
    async getStockData(ticker: string) {
      const data = await yahooFinance.quote(ticker);
      return {
        ticker: data.symbol,
        company: data.shortName,
        price: data.regularMarketPrice,
        change: data.regularMarketChangePercent,
      };
    }
  }
  ```

### 6.3 Watchlist Management
- Create a DTO for watchlist creation:
  ```typescript
  // src/shared/dto/create-watchlist.dto.ts
  import { IsString } from 'class-validator';

  export class CreateWatchlistDto {
    @IsString()
    ticker: string;
  }
  ```

- Implement the watchlist service:
  ```typescript
  // src/watchlists/watchlists.service.ts
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Watchlist } from './entities/watchlist.entity';
  import { CreateWatchlistDto } from '../shared/dto/create-watchlist.dto';

  @Injectable()
  export class WatchlistsService {
    constructor(
      @InjectRepository(Watchlist)
      private watchlistRepository: Repository<Watchlist>,
    ) {}

    async create(createWatchlistDto: CreateWatchlistDto, userId: number) {
      const watchlist = this.watchlistRepository.create({
        ...createWatchlistDto,
        user: { id: userId },
      });
      return this.watchlistRepository.save(watchlist);
    }

    async findAll(userId: number) {
      return this.watchlistRepository.find({ where: { user: { id: userId } } });
    }
  }
  ```

## 7. Deployment

- **Platform**: Deploy to [Railway](https://railway.app/) for simplicity and scalability.
- **Steps**:
  1. Create a new project on Railway and link your GitHub repository.
  2. Add environment variables (e.g., `POSTGRES_*`, `CLERK_*`, `NEWS_API_KEY`).
  3. Deploy the backend and monitor logs for errors.
- **Alternative**: Use [Heroku](https://www.heroku.com/) or [Render](https://render.com/) for similar managed hosting.

## 8. Best Practices

- **Security**:
  - Store API keys and database credentials in `.env` and never commit them to Git.
  - Use HTTPS for all API requests.
- **Performance**:
  - Cache external API responses in Redis to reduce calls (e.g., news for 5 minutes, stocks for 1 minute).
  - Optimize database queries with indexes on frequently accessed fields (e.g., `userId` in `Watchlist`).
- **Compliance**:
  - Ensure all API responses include a disclaimer: “For informational purposes only. Not investment advice.”
  - Verify compliance with Vietnam’s financial regulations.
- **Testing**:
  - Write unit tests for services using Jest:
    ```typescript
    // src/watchlists/watchlists.service.spec.ts
    import { Test, TestingModule } from '@nestjs/testing';
    import { WatchlistsService } from './watchlists.service';
    import { Repository } from 'typeorm';
    import { Watchlist } from './entities/watchlist.entity';

    describe('WatchlistsService', () => {
      let service: WatchlistsService;
      let repository: Repository<Watchlist>;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            WatchlistsService,
            {
              provide: 'WatchlistRepository',
              useClass: Repository,
            },
          ],
        }).compile();

        service = module.get<WatchlistsService>(WatchlistsService);
        repository = module.get('WatchlistRepository');
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });
    });
    ```
  - Use end-to-end tests with [Supertest](https://github.com/visionmedia/supertest) for API endpoints.

## 9. Conclusion

This guide provides a detailed roadmap for building the StockPulse backend using NestJS, covering database setup with PostgreSQL and TypeORM, schema definition for users and watchlists, a modular folder structure, and essential packages like `@nestjs/typeorm` and `@clerk/backend`. By integrating Clerk for authentication and libraries like `yahoo-finance2` for stock data, you can create a secure and efficient backend that meets the project’s requirements. This setup not only supports StockPulse’s features but also enhances your skills in backend development, making it a valuable addition to your portfolio.