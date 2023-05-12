const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const getUserId = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//リゾルバ関連のインポート
const Query = require("./resolver/Query");
const Link = require("./resolver/Link");
const Mutation = require("./resolver/Mutation");
const User = require("./resolver/User");

// リゾルバ関数（具体的な操作）
const resolvers = {
  User,
  Mutation,
  Link,
  Query,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
