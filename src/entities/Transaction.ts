import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Portfolio from "./Portfolio";

@Entity()
@ObjectType()
class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  portfolioId: number;

  @Column()
  @Field()
  symbol: string;

  @Column("float")
  @Field()
  value: number;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @ManyToOne(
    () => Portfolio,
    (portfolio: Portfolio) => portfolio.transactions,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "portfolioId" })
  portfolio: Portfolio;

  @Column("float")
  @Field()
  amount: number;
}

export default Transaction;
