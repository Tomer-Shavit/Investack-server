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
@InputType("cryptoInput")
@Entity()
class Crypto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column("float")
  @Field()
  amount: number;

  @Column()
  portfolioId: number;
  @ManyToOne(() => Portfolio, (portfolio: Portfolio) => portfolio.crypto)
  @JoinColumn({ name: "portfolioId" })
  portfolio: Portfolio;
}
export default Crypto;
