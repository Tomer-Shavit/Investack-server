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
    if (crypto.name in ownedCryptos) {
      ownedCryptos[crypto.name] += crypto.amount;
      await Crypto.update(
        { portfolioId: portfolio.id, name: crypto.name },
        { amount: ownedCryptos[crypto.name] }
      );
    } else {
      await Crypto.create({
        name: crypto.name,
        amount: crypto.amount,
        portfolioId: portfolio.id,
      }).save();
    }
  });
};

const cryptoArrToMap = (cryptos: Crypto[]): Record<string, number> => {
  const dict: Record<string, number> = {};
  cryptos.forEach((crypto) => {
    dict[crypto.name] = crypto.amount;
  });

  return dict;
};
