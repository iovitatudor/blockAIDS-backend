import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserGenderEnum } from "../enums/user-gender.enum";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 40 })
  email: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  public_key: string;

  @Column({ type: "date", nullable: true })
  birthdate: Date | null;

  @Column({ type: "varchar" })
  password: string;

  @Column({
    type: "enum",
    enum: [...Object.values(UserGenderEnum)],
    default: UserGenderEnum.male,
  })
  gender: string;

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
}
