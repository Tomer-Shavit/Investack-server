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
