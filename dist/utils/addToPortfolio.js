"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToPortfolio = void 0;
const Portfolio_1 = __importDefault(require("../entities/Portfolio"));
const addToPortfolio = (req, type, chosenCrypto, chosenStocks) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.session;
    const portfolio = yield Portfolio_1.default.findOne({ where: { userId } });
    console.log("portfolio1: ", portfolio);
    if (!portfolio) {
    } else if (type === "crypto" && chosenCrypto) {
      chosenCrypto.crypto.forEach((coin) => {
        const portfolioCoin = portfolio.crypto.find(
          (pCoin) => pCoin.name === coin.name
        );
        if (!portfolioCoin) {
          portfolio.crypto.push(Object.assign({}, coin));
        } else {
          portfolioCoin.amount += coin.amount;
        }
      });
    } else if (type === "stocks" && chosenStocks) {
      chosenStocks.stocks.forEach((stock) => {
        const portfolioStock = portfolio.stocks.find(
          (pStock) => pStock.symbol === stock.symbol
        );
        if (!portfolioStock) {
          portfolio.stocks.push(Object.assign({}, stock));
        } else {
          portfolioStock.shares += stock.shares;
        }
      });
    }
  });
exports.addToPortfolio = addToPortfolio;
//# sourceMappingURL=addToPortfolio.js.map
