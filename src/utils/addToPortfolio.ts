import Portfolio from "../entities/Portfolio";
import { Request } from "express";
import { ChosenCrypto, ChosenStocks } from "src/resolvers/portfolio";

export const addToPortfolio = async (
  req: Request,
  type: "crypto" | "stocks",
  chosenCrypto?: ChosenCrypto,
  chosenStocks?: ChosenStocks
) => {
  const { userId } = req.session;
  const portfolio = await Portfolio.findOne({ where: { userId } });
  if (!portfolio) {
    // do nothing
  } else if (type === "crypto" && chosenCrypto) {
    chosenCrypto.crypto.forEach((coin: any) => {
      const portfolioCoin = portfolio.crypto.find(
        (pCoin) => pCoin.name === coin.name
      );
      if (!portfolioCoin) {
        portfolio.crypto.push({
          ...coin,
        });
      } else {
        portfolioCoin.amount += coin.amount;
      }
    });
  } else if (type === "stocks" && chosenStocks) {
    chosenStocks.stocks.forEach((stock: any) => {
      const portfolioStock = portfolio.stocks.find(
        (pStock) => pStock.symbol === stock.symbol
      );
      if (!portfolioStock) {
        portfolio.stocks.push({
          ...stock,
        });
      } else {
        portfolioStock.shares += stock.shares;
      }
    });
  }
};
