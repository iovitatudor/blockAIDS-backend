import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Specialist } from "../../specialists/entities/specialist.entity";
import { TaskType } from "./task-type.entity";
import { Organization } from "../../organizations/entities/organization.entity";
import { Notification } from "../../notifications/entities/notification.entity";
import { TaskStatusEnum } from "../enums/task-status.enum";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  userId: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  user: User;

  @Column({ type: "uuid" })
  specialistId: string;

  @OneToMany(() => Specialist, (specialist) => specialist.id)
  @JoinTable()
  specialist: Specialist;

  @Column({ type: "uuid" })
  taskTypeId: string;

  @OneToMany(() => TaskType, (taskType) => taskType.id)
  @JoinTable()
  taskType: TaskType;

  @OneToMany(() => Organization, (organization) => organization.id)
  @JoinTable()
  organization: Organization;

  @Column({ type: "uuid" })
  organizationId: string;

  @Column({ type: "uuid" })
  notificationId: string;

  @OneToMany(() => Notification, (notification) => notification.id)
  @JoinTable()
  notification: Notification;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  due_date: Date;

  @Column({
    type: "enum",
    enum: [...Object.values(TaskStatusEnum)],
    default: TaskStatusEnum.InProgress,
  })
  status: TaskStatusEnum;

  @Column({ type: "int", nullable: true })
  points: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
