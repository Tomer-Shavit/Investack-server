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
const User_1 = __importDefault(require("./User"));
const Crypto_1 = __importDefault(require("./Crypto"));
const Stock_1 = __importDefault(require("./Stock"));
let Portfolio = class Portfolio extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Portfolio.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Portfolio.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => [Stock_1.default]),
    typeorm_1.Column("simple-array", { default: [] }),
    typeorm_1.OneToMany(() => Stock_1.default, (stock) => stock.portfolio),
    __metadata("design:type", Array)
], Portfolio.prototype, "stocks", void 0);
__decorate([
    type_graphql_1.Field(() => [Crypto_1.default]),
    typeorm_1.Column("simple-array", { default: [] }),
    typeorm_1.OneToMany(() => Crypto_1.default, (crypto) => crypto.portfolio),
    __metadata("design:type", Array)
], Portfolio.prototype, "crypto", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_1.default, (user) => user.portfolio),
    type_graphql_1.Field(() => User_1.default),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.default)
], Portfolio.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Portfolio.prototype, "value", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    type_graphql_1.Field(() => String),
    __metadata("design:type", Date)
], Portfolio.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    type_graphql_1.Field(() => String),
    __metadata("design:type", Date)
], Portfolio.prototype, "updatedAt", void 0);
Portfolio = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Portfolio);
exports.default = Portfolio;
//# sourceMappingURL=Portfolio.js.map