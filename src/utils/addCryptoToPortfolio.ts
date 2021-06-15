import { Request } from "express";
import Crypto from "../entities/Crypto";
import Portfolio from "../entities/Portfolio";

export const addCryptoToPortfolio = async (req: Request, cryptos: Crypto[]) => {
  const { userId } = req.session;
  const portfolio = await Portfolio.findOne(
    { userId },
    { relations: ["crypto"] }
  );

  if (!portfolio) {
    console.log("No portfolio were found");
    return;
    //do nothing
  }
  const ownedCryptos = cryptoArrToMap(portfolio.crypto);

  cryptos.forEach(async (crypto) => {
    if (crypto.symbol in ownedCryptos) {
      ownedCryptos[crypto.symbol].amount += crypto.amount;
      ownedCryptos[crypto.symbol].value += crypto.value;

      if (ownedCryptos[crypto.symbol].amount == 0) {
        await Crypto.delete({
          portfolioId: portfolio.id,
          symbol: crypto.symbol,
        });
      } else {
        await Crypto.update(
          { portfolioId: portfolio.id, symbol: crypto.symbol },
          {
            amount: ownedCryptos[crypto.symbol].amount,
            value: ownedCryptos[crypto.symbol].value,
          }
        );
      }
    } else {
      await Crypto.create({
        symbol: crypto.symbol,
        amount: crypto.amount,
        value: crypto.value,
        portfolioId: portfolio.id,
      }).save();
    }
  });
};

const cryptoArrToMap = (cryptos: Crypto[]) => {
  const dict: any = {};
  cryptos.forEach((crypto) => {
    dict[crypto.symbol] = { amount: crypto.amount, value: crypto.value };
  });

  return dict;
};
