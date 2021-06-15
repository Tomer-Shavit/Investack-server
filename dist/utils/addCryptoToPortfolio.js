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
exports.addCryptoToPortfolio = void 0;
const Crypto_1 = __importDefault(require("../entities/Crypto"));
const Portfolio_1 = __importDefault(require("../entities/Portfolio"));
const addCryptoToPortfolio = (req, cryptos) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.session;
    const portfolio = yield Portfolio_1.default.findOne({ userId }, { relations: ["crypto"] });
    if (!portfolio) {
        console.log("No portfolio were found");
        return;
    }
    const ownedCryptos = cryptoArrToMap(portfolio.crypto);
    cryptos.forEach((crypto) => __awaiter(void 0, void 0, void 0, function* () {
        if (crypto.symbol in ownedCryptos) {
            ownedCryptos[crypto.symbol].amount += crypto.amount;
            ownedCryptos[crypto.symbol].value += crypto.value;
            if (ownedCryptos[crypto.symbol].amount <= 0) {
                yield Crypto_1.default.delete({
                    portfolioId: portfolio.id,
                    symbol: crypto.symbol,
                });
            }
            else {
                yield Crypto_1.default.update({ portfolioId: portfolio.id, symbol: crypto.symbol }, {
                    amount: ownedCryptos[crypto.symbol].amount,
                    value: ownedCryptos[crypto.symbol].value,
                });
            }
        }
        else {
            yield Crypto_1.default.create({
                symbol: crypto.symbol,
                amount: crypto.amount,
                value: crypto.value,
                portfolioId: portfolio.id,
            }).save();
        }
    }));
});
exports.addCryptoToPortfolio = addCryptoToPortfolio;
const cryptoArrToMap = (cryptos) => {
    const dict = {};
    cryptos.forEach((crypto) => {
        dict[crypto.symbol] = { amount: crypto.amount, value: crypto.value };
    });
    return dict;
};
//# sourceMappingURL=addCryptoToPortfolio.js.map