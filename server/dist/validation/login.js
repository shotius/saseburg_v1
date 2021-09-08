"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = void 0;
const LoginValidation = ({ context, info }, next) => {
    console.log('contenxt', context);
    console.log('info', info);
    return next();
};
exports.LoginValidation = LoginValidation;
//# sourceMappingURL=login.js.map