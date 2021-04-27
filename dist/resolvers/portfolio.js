"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PortfolioResolver = exports.ChosenCrypto = exports.ChosenStocks = void 0;
const Portfolio_1 = __importDefault(require("../entities/Portfolio"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const addToPortfolio_1 = require("../utils/addToPortfolio");
const type_graphql_1 = require("type-graphql");
let ChosenStocks = class ChosenStocks {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], ChosenStocks.prototype, "stocks", void 0);
ChosenStocks = __decorate([
    type_graphql_1.InputType()
], ChosenStocks);
exports.ChosenStocks = ChosenStocks;
let ChosenCrypto = class ChosenCrypto {
};
ChosenCrypto = __decorate([
    type_graphql_1.InputType()
], ChosenCrypto);
exports.ChosenCrypto = ChosenCrypto;
let PortfolioResolver = class PortfolioResolver {
    portfolio({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const portfolio = yield Portfolio_1.default.findOne({ where: { userId } });
            return portfolio;
        });
    }
    addStocks({ req }, stocks) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            addToPortfolio_1.addToPortfolio(req, chosenStocks, stocks, "crypto");
            const portfolio = yield Portfolio_1.default.findOne({ where: { userId } });
            return portfolio;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Portfolio_1.default),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioResolver.prototype, "portfolio", null);
__decorate([
    type_graphql_1.Mutation(() => Portfolio_1.default),
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("stocks", () => ChosenStocks)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ChosenStocks]),
    __metadata("design:returntype", Promise)
], PortfolioResolver.prototype, "addStocks", null);
PortfolioResolver = __decorate([
    type_graphql_1.Resolver(() => Portfolio_1.default)
], PortfolioResolver);
exports.PortfolioResolver = PortfolioResolver;
//# sourceMappingURL=portfolio.js.map