import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './config/database.config';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, UserModule, TasksModule],
  controllers: [AppController],
})
export class AppModule {}
