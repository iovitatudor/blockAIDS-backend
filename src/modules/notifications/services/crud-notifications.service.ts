import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { UpdateNotificationDto } from "../dto/update-notification.dto";
import { Notification } from "../entities/notification.entity";

@Injectable()
export class CrudNotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {
  }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    try {
      return await this.notificationRepository.save(createNotificationDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  async findOne(id: number): Promise<Notification> {
    try {
      return await this.notificationRepository.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any Notification.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<UpdateResult> {
    try {
      return await this.notificationRepository.update(
        id,
        updateNotificationDto,
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.notificationRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}