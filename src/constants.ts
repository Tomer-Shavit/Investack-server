// import path from "node:path";
// import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// import Portfolio from "./entities/Portfolio";
// import User from "./entities/User";
import { PasswordResponse } from "./types";

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const PASSWORD_RESPONSES: PasswordResponse = {
  min: "Password length must be at least 4 characters",
  max: "Password length can not exceed 25 characters",
  uppercase: "Password must have at least 1 uppercase letter",
  lowercase: "Password must have at least 1 lowercase letter",
  digits: "Password must have at least 1 digit",
  spaces: "Password can not contain spaces",
};

// export const connectionOptions: PostgresConnectionOptions = {
//   type: "postgres",
//   host: "localhost",
//   username: "postgres",
//   password: "postgres",
//   database: "portfolio2chart",
//   synchronize: true,
//   logging: !__prod__,
//   entities: [User, Portfolio],
//   migrations: [path.join(__dirname + "/migrations/*")],
// };
