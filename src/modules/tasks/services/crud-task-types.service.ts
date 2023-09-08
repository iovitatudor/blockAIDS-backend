import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateTaskTypeDto } from "../dto/create-task-type.dto";
import { UpdateTaskTypeDto } from "../dto/update-task-type.dto";
import { TaskType } from "../entities/task-type.entity";

@Injectable()
export class CrudTaskTypesService {
  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
  ) {}

  async create(createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    try {
      return await this.taskTypeRepository.save(createTaskTypeDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<TaskType[]> {
    return this.taskTypeRepository.find();
  }

  async findOne(id: number): Promise<TaskType> {
    try {
      return await this.taskTypeRepository.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any task type.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateTaskTypeDto: UpdateTaskTypeDto,
  ): Promise<UpdateResult> {
    try {
      return await this.taskTypeRepository.update(id, updateTaskTypeDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.taskTypeRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}