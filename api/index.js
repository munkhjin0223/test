const express = require("express");
const { apolloServer } = require("./apolloServer");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
