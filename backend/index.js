// File: index.js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

async function startServer() {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      return {
        message: error.message,
        path: error.path,
        ...(process.env.NODE_ENV === "development" && {
          stacktrace: error.extensions?.stacktrace,
        }),
      };
    },
  });

  // Start the server
  await server.start();

  // Create Express app
  const app = express();

  // Configure CORS
  const corsOptions = {
    origin: [
      "http://localhost:3000", // React default
      "http://localhost:5173", // Vite default
      "http://localhost:8080", // Webpack default
      // Add your production domains here
      // 'https://your-domain.com',
    ],
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Apollo-Require-Preflight", // Required for Apollo Client
    ],
    credentials: true,
    maxAge: 86400, // CORS preflight cache time (24 hours)
  };

  // Apply middleware
  app.use(
    "/graphql",
    cors(corsOptions),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        return { token };
      },
    })
  );

  // Start Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(console.error);
