const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
const fs = require("fs");
const { merge } = require("lodash");

const employeeResolvers = require("./graphql/employee/resolvers");
const employeeTypeDefs = gql(fs.readFileSync("./graphql/employee/typeDefs.graphql", { encoding: "utf-8" }));

const schema = makeExecutableSchema({
  typeDefs: [employeeTypeDefs],
  resolvers: merge(employeeResolvers),
});

const server = new ApolloServer({ schema });

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
