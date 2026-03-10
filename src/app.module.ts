import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
 import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TodosModule],
})
export class AppModule {}
