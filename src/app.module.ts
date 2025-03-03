import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TaskEntity } from './tasks/tasks.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      entities: [TaskEntity, UserEntity],
      synchronize: true,
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
