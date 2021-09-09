"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAuth = void 0;
const IsAuth = ({ context }, next) => {
    const userId = context.req.session.userId;
    if (!userId) {
        throw new Error("Not authenticated");
    }
    return next();
};
exports.IsAuth = IsAuth;
//# sourceMappingURL=isAuth.js.map