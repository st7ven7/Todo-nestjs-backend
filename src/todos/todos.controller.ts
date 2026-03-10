import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req:any) {
    return this.todosService.createTodo(createTodoDto, req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTodo(@Request() req:any) {
    return this.todosService.getAllTodo(req.user.id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTodoById(@Param('id') id: string, @Request() req:any) {
    return this.todosService.getTodoById(+id, req.user.id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Request() req:any) {
    return this.todosService.updateTodo(+id, updateTodoDto, req.user.id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req:any) {
    return this.todosService.removeTodo(+id, req.user.id);
  }
}
