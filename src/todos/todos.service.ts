import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {

  constructor(private prisma: PrismaService){}

  async createTodo(createTodoDto: CreateTodoDto, userId: number) {
    return await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        completed: false,
        userId: userId,
      }
    });
  }

  async getAllTodo(userId: number) {
    return await this.prisma.todo.findMany({
      where: {
        userId: userId,
      }
    });
  }

  async getTodoById(todoId: number, userId: number) {
    const todo = await this.prisma.todo.findFirst({
      where:{
        id: todoId,
        userId: userId,
      },
    });
    
    if(!todo){
      throw new Error('Todo does not exist');
    }
    return await todo;
  }
  
  async updateTodo(todoId: number, updateTodoDto: UpdateTodoDto, userId: number) {
    
    const todo = await this.prisma.todo.findFirst({
      where:{
        id: todoId,
        userId: userId,
      },
    });
    
    if(!todo){
      throw new Error('Todo does not exist');
    }
    
    return await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: updateTodoDto,
    });
  }

  async removeTodo(todoId: number, userId: number) {
    
    const todo = await this.prisma.todo.findFirst({
      where:{
        id: todoId,
        userId: userId,
      },
    });

    if(!todo){
      throw new Error('Todo does not exist');
    }
    
    return await this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}
