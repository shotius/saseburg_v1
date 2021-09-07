import 'reflect-metadata';
import { User } from './entities/User';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/helloResolver';
import { UserResolver } from './resolvers/userResolver';

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

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`server is listening on http://localhost:4000/graphql`);
  });
};

void main();
