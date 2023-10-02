import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { UpdateNotificationDto } from "../dto/update-notification.dto";
import { Notification } from "../entities/notification.entity";
import { NotificationStatusEnum } from "../enums/notification-status.enum";

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
    return this.notificationRepository.find({
      order: { id: "DESC" },
      relations: {
        task: true,
        user: true,
        specialist: true,
      },
    });
  }

  findAllByUserId(id: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId: id },
      order: { id: "DESC" },
      relations: {
        task: true,
        user: true,
        specialist: true,
      },
    });
  }

  findAllBySpecialistId(id: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { specialistId: id },
      order: { id: "DESC" },
      relations: {
        task: true,
        user: true,
        specialist: true,
      },
    });
  }

  findScheduledByUserId(id: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId: id, user_status: NotificationStatusEnum.scheduled },
      order: { id: "DESC" },
      relations: {
        task: true,
        user: true,
        specialist: true,
      },
    });
  }

  findScheduledBySpecialistId(id: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { specialistId: id, specialist_status: NotificationStatusEnum.scheduled },
      order: { id: "DESC" },
      relations: {
        task: true,
        user: true,
        specialist: true,
      },
    });
  }

  async findOne(id: number): Promise<Notification> {
    try {
      return await this.notificationRepository.findOneOrFail({
        where: { id },
        relations: {
          task: true,
          user: true,
          specialist: true,
        },
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