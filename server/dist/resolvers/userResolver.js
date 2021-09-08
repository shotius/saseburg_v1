"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const registerValidation_1 = require("../validation/registerValidation");
const FieldError_1 = require("./FieldError");
const UsernamePasswordInput_1 = require("./UsernamePasswordInput");
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "usernameOrEmail", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    users() {
        return User_1.User.find();
    }
    async login(input, { req }) {
        const user = await User_1.User.findOne(input.usernameOrEmail.includes('@')
            ? { where: { email: input.usernameOrEmail } }
            : { where: { username: input.usernameOrEmail } });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrPassword',
                        message: 'username does not exist',
                    },
                ],
            };
        }
        const valid = await argon2_1.default.verify(user.password, input.password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'password is incorect',
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return { user };
    }
    async register(credentials) {
        const errors = (0, registerValidation_1.registerValidation)(credentials);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2_1.default.hash(credentials.password);
        const user = User_1.User.create({
            username: credentials.username,
            email: credentials.email,
            password: hashedPassword,
        });
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === "23505") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already exists",
                        },
                        {
                            field: "email",
                            message: "email already exist",
                        },
                    ],
                };
            }
        }
        return { user };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('credentials')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput_1.UsernamePasswordInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=userResolver.js.map