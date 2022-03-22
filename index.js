const express = require('express');
const {createServer} = require('http');
const cors = require('cors');
// const "reflect-metadata";
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const ws = require('ws');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const SessionApi = require('./datasources/sessions');
const SpeakerApi = require('./datasources/speakers');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const dataSources = () => ({
  SessionApi: new SessionApi(),
  SpeakerApi: new SpeakerApi()
});

const PORT = 4000;

(async () => {
    const app = express();
    const server = createServer(app);
    const corsOptions = {
      origin: 'http://localhost:3000', //PROD:change in prod
    }
    app.use(cors(corsOptions));

    const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers(pubsub) })

    const apolloServer = new ApolloServer({
      schema,
      dataSources,
      plugins: [{
        async serverWillStart() {
          return {
            async drainServer() {
              wsServer.close();
            }
          };
        }
      }]
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    const wsServer = new ws.Server({
      server,
      path: '/graphql',
    });
    
    server.listen(PORT, () => {
      useServer({ schema, dataSources }, wsServer);
      console.log(`server runnning on port ${PORT}`);
    });
    
    
    

    // let currentNumber = 0;
    // function incrementNumber() {
    //   currentNumber++;
    //   pubsub.publish("NOT", { id: currentNumber });
    //   console.log({ currentNumber })
    //   setTimeout(incrementNumber, 5000);
    // }
    // // Start incrementing
    // incrementNumber();
})()
