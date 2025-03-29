import { Module } from "@nestjs/common";
import { UserModule } from "./users/users.module";
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports:[UserModule, TasksModule]
})
export class AppModule {};