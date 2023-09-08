import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Task } from "../entities/task.entity";

@Injectable()
export class CrudTasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.save(createTaskDto);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    try {
      return await this.taskRepository.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any task.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    try {
      return await this.taskRepository.update(id, updateTaskDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.taskRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}