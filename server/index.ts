import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server started at ${url}`);
});
