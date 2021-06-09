import { myContext } from "../types";
import {
  Arg,
  Mutation,
  InputType,
  Query,
  Resolver,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { getConnection } from "typeorm";
import User from "../entities/User";
import "../customTypes/session/index";
import { checkRegisterInput } from "../utils/checkRegisterInput";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import Portfolio from "../entities/Portfolio";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

@InputType()
export class UserLoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldErrors {
  @Field()
  field: string;
  @Field()
  error: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => [FieldErrors], { nullable: true })
  errors?: FieldErrors[];
}

// The resolver let us do things to the data in the DB with queries and mutations
@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users(): Promise<User[] | undefined> {
    return User.find();
  }

  //return the user that is logged in
  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() { req }: myContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = User.findOne(req.session.userId, {
      relations: ["portfolio", "portfolio.stocks", "portfolio.crypto"],
    });
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("userInput") userInput: UserLoginInput,
    @Ctx() { req }: myContext
  ): Promise<UserResponse | null> {
    const validationCheck = checkRegisterInput(userInput);

    if (validationCheck) {
      return {
        errors: validationCheck,
      };
    }
    if (await User.findOne({ where: { email: userInput.email } })) {
      return {
        errors: [{ field: "email", error: "This email is already taken." }],
      };
    }

    //hashing the user password before saving it
    const hashedPass = await argon2.hash(userInput.password);

    try {
      const userResult = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: userInput.email,
          password: hashedPass,
        })
        .returning("*")
        .execute();

      let user: User = userResult.raw[0];

      // Creating a portfolio for the user
      // TODO: connect the 2 sql statements
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Portfolio)
        .values({
          user,
          stocksValue: "0",
          userId: user.id,
          stocks: [],
          crypto: [],
        })
        .execute();

      //save the user id in the session (redis store)
      req.session.userId = user.id;

      return {
        user,
      };
    } catch (err) {
      console.error("something went wrong: ", err);
      return {
        errors: [
          {
            field: "unknown",
            error: err,
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { req }: myContext,
    @Arg("userInput") userLoginInput: UserLoginInput
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: userLoginInput.email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            error: "Unable to find user with this email, please try again.",
          },
        ],
      };
    }

    const verify = await argon2.verify(user.password, userLoginInput.password);
    if (!verify) {
      return {
        errors: [
          {
            field: "password",
            error: "Incorrect password, please try again.",
          },
        ],
      };
    }

    //We were able to find the user in the DB and the password is correct
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: myContext) {
    return new Promise((response) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          response(false);
        } else {
          response(true);
        }
      });
    });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return false;
    } else {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute()
        .catch((err) => {
          console.log(err);
        });

      return true;
    }
  }
}
