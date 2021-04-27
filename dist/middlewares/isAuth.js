"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = ({ context: { req } }, next) => {
    if (!req.session.userId) {
        throw new Error("User is not authenticated.");
    }
    return next();
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map