"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_RESPONSES = exports.COOKIE_NAME = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.COOKIE_NAME = "qid";
exports.PASSWORD_RESPONSES = {
    min: "Password length must be at least 4 characters",
    max: "Password length can not exceed 25 characters",
    uppercase: "Password must have at least 1 uppercase letter",
    lowercase: "Password must have at least 1 lowercase letter",
    digits: "Password must have at least 1 digit",
    spaces: "Password can not contain spaces",
};
//# sourceMappingURL=constants.js.map