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
exports.UserResolver = exports.FieldErrors = exports.UserLoginInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
require("../customTypes/session/index");
const checkRegisterInput_1 = require("../utils/checkRegisterInput");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const Portfolio_1 = __importDefault(require("../entities/Portfolio"));
let UserLoginInput = class UserLoginInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
UserLoginInput = __decorate([
    type_graphql_1.InputType()
], UserLoginInput);
exports.UserLoginInput = UserLoginInput;
let FieldErrors = class FieldErrors {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldErrors.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldErrors.prototype, "error", void 0);
FieldErrors = __decorate([
    type_graphql_1.ObjectType()
], FieldErrors);
exports.FieldErrors = FieldErrors;
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => User_1.default, { nullable: true }),
    __metadata("design:type", User_1.default)
], UserResponse.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldErrors], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.find();
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const user = User_1.default.findOne(req.session.userId, {
                relations: ["portfolio", "portfolio.stocks", "portfolio.crypto"],
            });
            return {
                user,
            };
        });
    }
    register(userInput, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationCheck = checkRegisterInput_1.checkRegisterInput(userInput);
            if (validationCheck) {
                return {
                    errors: validationCheck,
                };
            }
            if (yield User_1.default.findOne({ where: { email: userInput.email } })) {
                return {
                    errors: [{ field: "email", error: "This email is already taken." }],
                };
            }
            const hashedPass = yield argon2_1.default.hash(userInput.password);
            try {
                const userResult = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(User_1.default)
                    .values({
                    email: userInput.email,
                    password: hashedPass,
                })
                    .returning("*")
                    .execute();
                let user = userResult.raw[0];
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Portfolio_1.default)
                    .values({
                    user,
                    value: 0,
                    userId: user.id,
                    stocks: [],
                    crypto: [],
                })
                    .execute();
                req.session.userId = user.id;
                return {
                    user,
                };
            }
            catch (err) {
                console.error("something went wrong: ", err);
                return {
                    errors: [
                        {
                            field: "unknown",
                            error: err,
                        },
                    ],
                };
            }
        });
    }
    login({ req }, userLoginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ where: { email: userLoginInput.email } });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "email",
                            error: "Unable to find user with this email, please try again.",
                        },
                    ],
                };
            }
            const verify = yield argon2_1.default.verify(user.password, userLoginInput.password);
            if (!verify) {
                return {
                    errors: [
                        {
                            field: "password",
                            error: "Incorrect password, please try again.",
                        },
                    ],
                };
            }
            req.session.userId = user.id;
            return {
                user,
            };
        });
    }
    logout({ req, res }) {
        return new Promise((response) => {
            req.session.destroy((err) => {
                res.clearCookie(constants_1.COOKIE_NAME);
                if (err) {
                    response(false);
                }
                else {
                    response(true);
                }
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ where: { id } });
            if (!user) {
                return false;
            }
            else {
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(User_1.default)
                    .where("id = :id", { id })
                    .execute()
                    .catch((err) => {
                    console.log(err);
                });
                return true;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.default], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => UserResponse, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("userInput")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("userInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserLoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(() => User_1.default)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map