import {
  Column,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => User)
  user: User;

  @Column({ type: "uuid" })
  specialistId: string;

  @ManyToOne(() => Specialist)
  specialist: Specialist;

  @Column({ type: "uuid" })
  taskTypeId: string;

  @ManyToOne(() => TaskType)
  taskType: TaskType;

  @Column({ type: "uuid" })
  organizationId: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => Notification)
  notification: Notification;

  @Column({ type: "varchar", length: 100 })
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

  @Column({ type: "varchar", nullable: true })
  pay_signature: string;

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
