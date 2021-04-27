import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Stocks {
  @Column()
  @Field()
  symbol: string;
  @Column("float")
  @Field()
  shares: number;
}
