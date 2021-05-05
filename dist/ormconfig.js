"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const constants_1 = require("./constants");
const Portfolio_1 = __importDefault(require("./entities/Portfolio"));
const User_1 = __importDefault(require("./entities/User"));
const connectionOptions = {
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "portfolio2chart",
    synchronize: true,
    logging: !constants_1.__prod__,
    entities: [User_1.default, Portfolio_1.default],
    migrations: [node_path_1.default.join(__dirname + "/migrations/*")],
};
module.exports = connectionOptions;
//# sourceMappingURL=ormconfig.js.map