import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    try {
      return await this.taskService.getAllTask();
    } catch (error) {
      // Manejo de errores, se puede personalizar el mensaje
      throw new Error('Error al obtener las tareas: ' + error.message);
    }
  }

  @Get('/:id')
  async getTask(@Param('id') id: string) {
    try {
      const task = await this.taskService.getTaskById(parseInt(id));
      if (!task) {
        throw new Error('Tarea no encontrada');
      }
      return task;
    } catch (error) {
      throw new Error('Error al obtener la tarea: ' + error.message);
    }
  }

  @Post()
  async createTask(@Body() task: Task) {
    try {
      return await this.taskService.createTask(task.title, task.description);
    } catch (error) {
      throw new Error('Error al crear la tarea: ' + error.message);
    }
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(parseInt(id));
    } catch (error) {
      throw new Error('Error al eliminar la tarea: ' + error.message);
    }
  }

  @Put('/:id')
  async updateTask(@Param('id') id: string, @Body() task: Task) {
    try {
      return await this.taskService.updateTask(parseInt(id), task);
    } catch (error) {
      throw new Error('Error al actualizar la tarea: ' + error.message);
    }
  }
}
