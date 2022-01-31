import { ApolloServer } from "apollo-server-express";
import express from "express";
import { Model } from "objection";
import { typeDefs } from "./task/task.schema";
import { resolvers } from "./task/task.resolvers";
import { knex } from "./knex";

Model.knex(knex);

const port = 4000;

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => console.log(`Server listening at port: ${port}`));
})();
