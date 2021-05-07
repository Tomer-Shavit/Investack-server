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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Portfolio_1 = __importDefault(require("./Portfolio"));
let Crypto = class Crypto extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Crypto.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Crypto.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("float"),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Crypto.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Crypto.prototype, "portfolioId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Portfolio_1.default, (portfolio) => portfolio.crypto),
    typeorm_1.JoinColumn({ name: "portfolioId" }),
    __metadata("design:type", Portfolio_1.default)
], Crypto.prototype, "portfolio", void 0);
Crypto = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType("cryptoInput"),
    typeorm_1.Entity()
], Crypto);
exports.default = Crypto;
//# sourceMappingURL=Crypto.js.map