import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import { Crypto } from "./Crypto";
import { Stocks } from "./Stocks";

@Entity()
@ObjectType()
class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  userId: number;

  @Column("simple-array")
  @Field(() => [Stocks])
  stocks: Stocks[];

  @Column("simple-array")
  @Field(() => [Crypto])
  crypto: Crypto[];

  @OneToOne(() => User, (user) => user.portfolio) //link a portfolio to a user
  @Field(() => User)
  user: User;

  @Column()
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
