import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './config/database.config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, TasksModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
