import { PostResolvers } from './resolvers/postResolvers';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { HelloResolver } from './resolvers/helloResolver';
import { UserResolver } from './resolvers/userResolver';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './utils/constants';
import cors from 'cors';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'saseburg',
    username: 'postgres',
    password: '1234',
    synchronize: true,
    logging: true,
    entities: [User, Post],
  });

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    })
  );

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      secret: 'asdfasdfasdf',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // one day
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResolvers],
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
