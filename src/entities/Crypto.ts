import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Crypto {
  @Column()
  @Field()
  name: string;
  @Column("float")
  @Field()
  amount: number;
}
