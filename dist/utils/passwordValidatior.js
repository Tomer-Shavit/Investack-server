"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidation = void 0;
var passwordValidator = require("password-validator");
var schema = new passwordValidator();
exports.passwordValidation = schema
    .is()
    .min(4)
    .is()
    .max(25)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();
//# sourceMappingURL=passwordValidatior.js.map