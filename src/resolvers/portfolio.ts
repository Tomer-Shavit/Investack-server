import Stock from "../entities/Stock";
import Crypto from "../entities/Crypto";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Portfolio from "../entities/Portfolio";
import { myContext } from "../types";

import { addStocksToPortfolio } from "../utils/addStocksToPortfolio";
import { addCryptoToPortfolio } from "../utils/addCryptoToPortfolio";

@Resolver(() => Portfolio)
export class PortfolioResolver {
  @Query(() => Portfolio, { nullable: true })
  async myPortfolio(@Ctx() { req }: myContext): Promise<Portfolio | undefined> {
    const { userId } = req.session;
    const portfolio = await Portfolio.findOne(
      { userId },
      {
        relations: ["stocks", "crypto"],
      }
    );
    return portfolio;
  }

  @Mutation(() => Boolean)
  async addStocks(
    @Ctx() { req }: myContext,
    @Arg("stocksInput", () => [Stock]) stocksInput: Stock[]
  ): Promise<Boolean> {
    await addStocksToPortfolio(req, stocksInput);
    return true;
  }

  @Mutation(() => Boolean)
  async addCrypto(
    @Ctx() { req }: myContext,
    @Arg("cryptoInput", () => [Crypto]) cryptoInput: Crypto[]
  ): Promise<Boolean> {
    await addCryptoToPortfolio(req, cryptoInput);
    return true;
  }
}
