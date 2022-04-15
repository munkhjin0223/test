const { ApolloServer, gql } = require("apollo-server-express");
import { WebSocketServer } from "ws";

// The GraphQL schema
const typeDefs = gql`
  type PressCenter {
    id: String
    name: String
  }

  type Book {
    title: String
    author: String
    pressCenter: PressCenter
  }

  type BookListResponse {
    list: [Book]
    totalCount: Int
  }

  input BookInput {
    title: String
    author: String
  }

  type Query {
    "A simple type for getting started!"
    books: BookListResponse
  }

  type Mutation {
    addBook(input: BookInput): String
  }

  type Subscription {
    bookAdded: String
  }
`;

const PressCenters = [
  {
    id: "pressCenterId1",
    name: "Press center",
  },
  {
    id: "pressCenterId2",
    name: "Press center 2",
  },
];

// A map of functions which return data for the schema.
const resolvers = {
  Book: {
    pressCenter: book => {
      return PressCenters.find(p => p.id === book.pressCenterId);
    },
  },

  Sub

  Query: {
    books: () => {
      return {
        list: [
          {
            title: "Book1",
            author: "Author 1",
            pressCenterId: "pressCenterId1",
            createdBy: "id1",
          },
          {
            title: "Book1",
            author: "Author 1",
            pressCenterId: "pressCenterId1",
            createdBy: "id1",
          },
        ],
        totalCount: 10,
      };
    },
  },

  Mutation: {
    addBook: (_root, { input }) => {
      console.log("title: ", input.title);
      console.log("author: ", input.author);

      return "done";
    },
  },
};

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: "/graphql",
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.apolloServer = apolloServer;
