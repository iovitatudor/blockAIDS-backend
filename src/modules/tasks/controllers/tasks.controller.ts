import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TasksResource } from "../resources/tasks.resource";
import { CrudTasksService } from "../services/crud-tasks.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@ApiTags("Task")
@Controller("api/tasks")
export class TasksController {
  constructor(private readonly crudTasksService: CrudTasksService) {
  }

  @ApiResponse({ status: 200, type: [TasksResource] })
  @ApiOperation({ summary: "Get all tasks" })
  @Get()
  async findAll() {
    const task = await this.crudTasksService.findAll();
    return TasksResource.collect(task);
  }

  @ApiResponse({ status: 200, type: [TasksResource] })
  @ApiOperation({ summary: "Get all tasks by specialist id" })
  @Get("/specialist/:id")
  async findAllBySpecialist(@Param("id") id: string) {
    const task = await this.crudTasksService.findAllBySpecialistId(id);
    return TasksResource.collect(task);
  }

  @ApiResponse({ status: 200, type: [TasksResource] })
  @ApiOperation({ summary: "Get all tasks by user id" })
  @Get("/user/:id")
  async findAllByUser(@Param("id") id: string) {
    const task = await this.crudTasksService.findAllByUserId(id);
    return TasksResource.collect(task);
  }

  @ApiResponse({ status: 200, type: TasksResource })
  @ApiOperation({ summary: "Get task by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const taskType = await this.crudTasksService.findOne(+id);
    return new TasksResource(taskType);
  }

  @ApiResponse({ status: 200, type: TasksResource })
  @ApiOperation({ summary: "Create task type" })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const createdTask = await this.crudTasksService.create(createTaskDto);

    const taskType = await this.crudTasksService.findOne(createdTask.id);
    return new TasksResource(taskType);
  }

  @ApiResponse({ status: 200, type: TasksResource })
  @ApiOperation({ summary: "Update task" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.crudTasksService.update(+id, updateTaskDto);
    const task = await this.crudTasksService.findOne(+id);
    return new TasksResource(task);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete task" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const specialist = await this.crudTasksService.remove(+id);
    return new TasksResource(specialist);
  }
}