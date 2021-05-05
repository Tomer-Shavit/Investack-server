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
exports.PortfolioResolver = void 0;
const Stock_1 = __importDefault(require("../entities/Stock"));
const type_graphql_1 = require("type-graphql");
const Portfolio_1 = __importDefault(require("../entities/Portfolio"));
let PortfolioResolver = class PortfolioResolver {
    myPortfolio({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const portfolio = yield Portfolio_1.default.findOne({ where: { userId } });
            return portfolio;
        });
    }
    addStocks({ req }, stocksInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const portfolio = yield Portfolio_1.default.findOne({ userId }, { relations: ["stocks"] });
            console.log("portfolio: ", portfolio);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Portfolio_1.default, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioResolver.prototype, "myPortfolio", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("stocksInput", () => [Stock_1.default])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], PortfolioResolver.prototype, "addStocks", null);
PortfolioResolver = __decorate([
    type_graphql_1.Resolver(() => Portfolio_1.default)
], PortfolioResolver);
exports.PortfolioResolver = PortfolioResolver;
//# sourceMappingURL=portfolio.js.map