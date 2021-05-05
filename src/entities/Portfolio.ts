import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import { Crypto } from "./Crypto";
import Stock from "./Stock";

@Entity()
@ObjectType()
class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  userId: number;

  @Column("simple-array", { default: [] })
  @OneToMany(() => Stock, (stock: Stock) => stock.portfolio)
  stocks: Stock[];

  @Column("simple-array", { default: [] })
  crypto: Crypto[];

  @OneToOne(() => User, (user) => user.portfolio) //link a portfolio to a user
  @Field(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ default: 0 })
  @Field(() => Number) //The value of all the portfolio in usd
  value: number;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;
}

export default Portfolio;
