import { myContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

const isAuth: MiddlewareFn<myContext> = ({ context: { req } }, next) => {
  if (!req.session.userId) {
    throw new Error("User is not authenticated.");
  }
  return next();
};

export default isAuth;
