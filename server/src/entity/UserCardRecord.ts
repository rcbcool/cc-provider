import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { UserCard } from "./UserCard";

@Entity()
export class UserCardRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  limit: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;

  @ManyToMany(() => UserCard, (usercard) => usercard.usercardrecords)
  @JoinTable()
  usercards: UserCard[];
}