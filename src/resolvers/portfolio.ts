import Stock from "../entities/Stock";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Portfolio from "../entities/Portfolio";
import { myContext } from "../types";
import { getConnection } from "typeorm";

@Resolver(() => Portfolio)
export class PortfolioResolver {
  @Query(() => Portfolio, { nullable: true })
  async myPortfolio(@Ctx() { req }: myContext): Promise<Portfolio | undefined> {
    const { userId } = req.session;
    const portfolio = await Portfolio.findOne({ where: { userId } });
    return portfolio;
  }

  @Mutation(() => Boolean)
  async addStocks(
    @Ctx() { req }: myContext,
    @Arg("stocksInput", () => [Stock]) stocksInput: Stock[]
  ): Promise<Boolean> {
    const { userId } = req.session;
    const portfolio = await Portfolio.findOne(
      { userId },
      { relations: ["stocks"] }
    );

    // await getConnection()
    //   .createQueryBuilder()
    //   .relation(Portfolio, "stocks")
    //   .of({ userId })
    //   .add(stocksInput);

    // const stock = new Stock();
    // const stocksSymbols = portfolio?.stocks.map(stock => stock.symbol)
    // await getConnection().createQueryBuilder().

    // for (let i = 0; i < stocksInput.length; i++) {
    //   if(portfolio!.stocks.includes(stocksInput[i].symbol)){
    //     await Stock.update()
    //   }
    //   fetchedStock.symbol = stocksInput[i].symbol;
    //   fetchedStock.shares = stocksInput[i].shares;
    //   fetchedStock.portfolioId = portfolio!.id;
    //   await Stock.create(fetchedStock).save();
    // }

    console.log("portfolio: ", portfolio);

    return true;
  }
}
