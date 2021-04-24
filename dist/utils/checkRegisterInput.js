"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRegisterInput = void 0;
const constants_1 = require("../constants");
const passwordValidatior_1 = require("./passwordValidatior");
const checkRegisterInput = ({ email, password, }) => {
    if (!email.includes("@")) {
        return [
            {
                field: "email",
                error: "Invalid email",
            },
        ];
    }
    else if (!email.includes(".")) {
        return [
            {
                field: "email",
                error: "Invalid email",
            },
        ];
    }
    const response = passwordValidatior_1.passwordValidation.validate(password, {
        list: true,
    });
    if (response.length > 0) {
        return [
            {
                field: "password",
                error: constants_1.PASSWORD_RESPONSES[response[0]],
            },
        ];
    }
    return null;
};
exports.checkRegisterInput = checkRegisterInput;
//# sourceMappingURL=checkRegisterInput.js.map