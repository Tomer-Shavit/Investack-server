import Portfolio from "../entities/Portfolio";
import { Stocks } from "../entities/Stocks";
import isAuth from "../middlewares/isAuth";
import { myContext } from "../types";
import { addToPortfolio } from "../utils/addToPortfolio";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@InputType()
export class ChosenStocks {
  @Field()
  stocks: Stocks[];
}
@InputType()
export class ChosenCrypto {
  crypto: Crypto[];
}

@Resolver(() => Portfolio)
export class PortfolioResolver {
  @Query(() => Portfolio)
  async portfolio(@Ctx() { req }: myContext): Promise<Portfolio | undefined> {
    const { userId } = req.session;
    const portfolio = await Portfolio.findOne({ where: { userId } });
    return portfolio;
  }

  @Mutation(() => Portfolio)
  @UseMiddleware(isAuth)
  async addStocks(
    @Ctx() { req }: myContext,
    @Arg("stocks", () => ChosenStocks) stocks: ChosenStocks
  ): Promise<Portfolio | undefined> {
    const { userId } = req.session;
    addToPortfolio(req, chosenStocks: stocks, "crypto");
    const portfolio = await Portfolio.findOne({ where: { userId } });
    return portfolio;
  }
}
