import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { HelloResolver } from './resolvers/helloResolver';
import { UserResolver } from './resolvers/userResolver';
// import session from "express-session"
// import connectRedis from 'connect-redis';
// import Redis from 'ioredis';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'saseburg',
    username: 'postgres',
    password: '1234',
    synchronize: true,
    logging: true,
    entities: [User],
  });

  // initialize redis
  // const RedisStore = connectRedis(session);
  // const redis = new Redis()
  
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
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
