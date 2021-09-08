"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const registerValidation = (credentials) => {
    if (credentials.username.length < 3) {
        return [
            {
                field: 'username',
                message: 'username must be longer then 3 character',
            },
        ];
    }
    if (credentials.password.length < 4) {
        return [
            {
                field: 'password',
                message: 'password must by more then 4 characters',
            },
        ];
    }
    if (!credentials.email.includes('@')) {
        return [
            {
                field: 'email',
                message: 'email is not valid',
            },
        ];
    }
    return null;
};
exports.registerValidation = registerValidation;
//# sourceMappingURL=registerValidation.js.map