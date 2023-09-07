import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { NotificationStatusEnum } from "../enums/notification-status.enum";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: [...Object.values(NotificationStatusEnum)],
    default: NotificationStatusEnum.scheduled,
  })
  status: string;

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
