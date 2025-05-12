import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { User } from './entities/user.entity';
import { UserPreferences } from './entities/user-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPreferences])],
  controllers: [UsersController, PreferencesController],
  providers: [UsersService, PreferencesService],
  exports: [UsersService, PreferencesService],
})
export class UsersModule {}