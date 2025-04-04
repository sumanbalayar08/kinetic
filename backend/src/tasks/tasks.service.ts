import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = new this.taskModel(createTaskDto);
    return user.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to retrieve task: ${err.message}`,
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .exec();

      return { message: 'Task updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to retrieve task: ${err.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskModel.findByIdAndDelete(id).exec();

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return { message: 'Task deleted successfully' };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to delete task: ${err.message}`,
      );
    }
  }
}
