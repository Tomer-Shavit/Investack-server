import "reflect-metadata";
import { createConnection } from "typeorm";
import path from "path";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { myContext } from "./types";
import cors from "cors";
import { PortfolioResolver } from "./resolvers/portfolio";
import User from "./entities/User";
import Portfolio from "./entities/Portfolio";
import Stock from "./entities/Stock";
import Crypto from "./entities/Crypto";

const main = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "investack",
    synchronize: true,
    logging: !__prod__,
    entities: [User, Portfolio, Stock, Crypto],
    migrations: [path.join(__dirname + "/migrations/*")],
  });

  // await User.delete({});
  // await Portfolio.delete({});
  // await Stock.delete({});
  // await Crypto.delete({});

  //Creating an express app
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const redis = new Redis();
  const RedisStore = connectRedis(session);
  app.use(
    session({
      secret: "ahsfilghslkjdghsajdgh235sfd",
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        sameSite: "lax",
        httpOnly: true,
        secure: __prod__,
      },
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
    })
  );

  //Creating an apollo server, this creates the graphql playground and let us use the resolvers
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PortfolioResolver],
      validate: true,
    }),
    context: ({ req, res }): myContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`Server is running on localhost:4000`);
  });
};

main();
