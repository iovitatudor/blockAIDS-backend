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
import { TaskTypeResource } from "../resources/task-type.resource";
import { CrudTaskTypesService } from "../services/crud-task-types.service";
import { CreateTaskTypeDto } from "../dto/create-task-type.dto";
import { UpdateTaskTypeDto } from "../dto/update-task-type.dto";

@ApiTags("Task Types")
@Controller("api/task-types")
export class TaskTypeController {
  constructor(private readonly crudTaskTypesService: CrudTaskTypesService) {
  }

  @ApiResponse({ status: 200, type: [TaskTypeResource] })
  @ApiOperation({ summary: "Get all task types" })
  @Get()
  async findAll() {
    const taskType = await this.crudTaskTypesService.findAll();
    return TaskTypeResource.collect(taskType);
  }

  @ApiResponse({ status: 200, type: TaskTypeResource })
  @ApiOperation({ summary: "Get task type by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const taskType = await this.crudTaskTypesService.findOne(+id);
    return new TaskTypeResource(taskType);
  }

  @ApiResponse({ status: 200, type: TaskTypeResource })
  @ApiOperation({ summary: "Create task type" })
  @Post()
  async create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    const createdTaskType =
      await this.crudTaskTypesService.create(createTaskTypeDto);

    const taskType = await this.crudTaskTypesService.findOne(
      createdTaskType.id,
    );
    return new TaskTypeResource(taskType);
  }

  @ApiResponse({ status: 200, type: TaskTypeResource })
  @ApiOperation({ summary: "Update task type" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskTypeDto: UpdateTaskTypeDto,
  ) {
    await this.crudTaskTypesService.update(+id, updateTaskTypeDto);
    const taskType = await this.crudTaskTypesService.findOne(+id);
    return new TaskTypeResource(taskType);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete task type" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const specialist = await this.crudTaskTypesService.remove(+id);
    return new TaskTypeResource(specialist);
  }
}