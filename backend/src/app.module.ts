import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Root module of the application
 * Imports all other modules and configures TypeORM for database connection
 */
@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Configure TypeORM with PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', 'localhost'),
        port: configService.get('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER', 'stockpulse_user'),
        password: configService.get('POSTGRES_PASSWORD', 'stockpulse_pass'),
        database: configService.get('POSTGRES_DB', 'stockpulse_db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV', 'development') !== 'production',
        logging: configService.get('NODE_ENV', 'development') !== 'production',
      }),
    }),
    
    // Import feature modules here
    // UsersModule,
    // AuthModule,
    // WatchlistsModule,
    // PortfoliosModule,
    // StocksModule,
  ],
})
export class AppModule {}