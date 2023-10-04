import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { NotificationStatusEnum } from "../enums/notification-status.enum";
import { Specialist } from "../../specialists/entities/specialist.entity";
import { Task } from "../../tasks/entities/task.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { onDelete: "CASCADE" })
  task: Task;

  @Column({ type: "uuid" })
  taskId: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => Specialist)
  specialist: Specialist;

  @Column({ type: "uuid" })
  specialistId: string;

  @Column({
    type: "enum",
    enum: [...Object.values(NotificationStatusEnum)],
    default: NotificationStatusEnum.scheduled,
  })
  user_status: string;

  @Column({
    type: "enum",
    enum: [...Object.values(NotificationStatusEnum)],
    default: NotificationStatusEnum.scheduled,
  })
  specialist_status: string;

  @Column({ type: "varchar", length: 255 })
  user_message: string;

  @Column({ type: "varchar", length: 255 })
  specialist_message: string;

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
