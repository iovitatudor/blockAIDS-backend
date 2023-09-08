import { Module } from "@nestjs/common";
import { CrudTasksService } from "./services/crud-tasks.service";
import { TasksController } from "./controllers/tasks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskType } from "./entities/task-type.entity";
import { CrudTaskTypesService } from "./services/crud-task-types.service";
import { TaskTypeController } from "./controllers/task-type.controller";
import { Task } from "./entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TaskType, Task])],
  controllers: [TaskTypeController, TasksController],
  providers: [CrudTaskTypesService, CrudTasksService],
})
export class TasksModule {
}
