import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Portfolio from "./Portfolio";

// This entity is doing 2 things, declare the typeDefs for graphql (using type-graphql)
// And also creates the table in our data base using typeORM
@ObjectType()
@Entity()
// The "extends BaseEntity" let us preform CRUD on the User table
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Portfolio, (portfolio) => portfolio.user) // specify inverse side as a second parameter
  @Field(() => Portfolio, { nullable: true })
  portfolio: Portfolio;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;
}

export default User;
