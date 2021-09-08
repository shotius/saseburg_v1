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
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [helloResolver_1.HelloResolver, userResolver_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log(`server is listening on http://localhost:4000/graphql`);
    });
};
void main();
//# sourceMappingURL=index.js.map