"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStocksToPortfolio = void 0;
const Stock_1 = __importDefault(require("../entities/Stock"));
const Portfolio_1 = __importDefault(require("../entities/Portfolio"));
const addStocksToPortfolio = (req, stocks) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.session;
    const portfolio = yield Portfolio_1.default.findOne({ userId }, { relations: ["stocks"] });
    if (!portfolio) {
        console.log("No portfolio were found");
        return;
    }
    const ownedStocks = stocksArrToMap(portfolio.stocks);
    stocks.forEach((stock) => __awaiter(void 0, void 0, void 0, function* () {
        if (stock.symbol in ownedStocks) {
            ownedStocks[stock.symbol] += stock.shares;
            yield Stock_1.default.update({ portfolioId: portfolio.id, symbol: stock.symbol }, { shares: ownedStocks[stock.symbol] });
        }
        else {
            yield Stock_1.default.create({
                symbol: stock.symbol,
                shares: stock.shares,
                portfolioId: portfolio.id,
            }).save();
        }
    }));
});
exports.addStocksToPortfolio = addStocksToPortfolio;
const stocksArrToMap = (stocks) => {
    const dict = {};
    stocks.forEach((stock) => {
        dict[stock.symbol] = stock.shares;
    });
    return dict;
};
//# sourceMappingURL=addStocks.js.map