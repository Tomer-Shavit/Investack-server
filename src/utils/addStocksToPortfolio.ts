import { Request } from "express";
import Stock from "../entities/Stock";
import Portfolio from "../entities/Portfolio";

export const addStocksToPortfolio = async (req: Request, stocks: Stock[]) => {
  const { userId } = req.session;
  const portfolio = await Portfolio.findOne(
    { userId },
    { relations: ["stocks"] }
  );

  if (!portfolio) {
    console.log("No portfolio were found");
    return;
    //do nothing
  }
  const ownedStocks = stocksArrToMap(portfolio.stocks);

  stocks.forEach(async (stock) => {
    if (stock.symbol in ownedStocks) {
      ownedStocks[stock.symbol] += stock.shares;
      await Stock.update(
        { portfolioId: portfolio.id, symbol: stock.symbol },
        { shares: ownedStocks[stock.symbol] }
      );
    } else {
      await Stock.create({
        symbol: stock.symbol,
        shares: stock.shares,
        portfolioId: portfolio.id,
      }).save();
    }
  });
};

const stocksArrToMap = (stocks: Stock[]): Record<string, number> => {
  const dict: Record<string, number> = {};
  stocks.forEach((stock) => {
    dict[stock.symbol] = stock.shares;
  });

  return dict;
};
