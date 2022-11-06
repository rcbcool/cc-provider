import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./User";
import { UserCardRecord } from "./UserCardRecord";

@Entity()
export class UserCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  card_no: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;

  @ManyToMany(
    () => UserCardRecord,
    (usercardrecord) => usercardrecord.usercards
  )
  usercardrecords: UserCardRecord[];
}
