import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Portfolio from "./Portfolio";

@ObjectType()
@InputType("stocksInput")
@Entity()
class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  symbol: string;

  @Column("float")
  @Field()
  amount: number;

  @Column("float")
  @Field()
  value: number;

  @Column()
  portfolioId: number;
  @ManyToOne(() => Portfolio, (portfolio: Portfolio) => portfolio.stocks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "portfolioId" })
  portfolio: Portfolio;
}

export default Stock;
