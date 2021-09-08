"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const helloResolver_1 = require("./resolvers/helloResolver");
const userResolver_1 = require("./resolvers/userResolver");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./utils/constants");
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'saseburg',
        username: 'postgres',
        password: '1234',
        synchronize: true,
        logging: true,
        entities: [User_1.User],
    });
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = new ioredis_1.default();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: 'qid',
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        saveUninitialized: false,
        secret: 'asdfasdfasdf',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [helloResolver_1.HelloResolver, userResolver_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log(`server is listening on http://localhost:4000/graphql`);
    });
};
void main();
//# sourceMappingURL=index.js.map