import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Organization } from "../../organizations/entities/organization.entity";
import {Task} from "../../tasks/entities/task.entity";

@Entity()
export class Specialist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  organizationId: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  job_position: string;

  @Column({ type: "varchar", length: 40 })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", length: 255, default: "avatar-mock.png" })
  avatar: string;

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

  // @ManyToOne(() => Task)
  // task: Task[];
  //
  // @ManyToOne(() => Task, (task) => taks.specialist)
  // @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  // owner!: PetOwner
}
