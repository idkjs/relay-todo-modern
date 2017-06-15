import express from 'express';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';
import IO from 'socket.io';
//*****************************************************************************************/

//if you don't have below line, nodemon won't re-load generateSchemaJson, 
//and as such your old schema.json is used
import './scripts/updateSchema';
//however you don't have to explicitly call the generateSchemaJSON method, as it's automatically 
//callel everytime the file is loaded (node loads that module)
const GRAPHQL_PORT = process.env.port || 8081;

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema, graphiql: true, pretty: true}));
const httpServer = graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

const io = IO(httpServer);
io.on('connection', socket => {
  socket.emit('greeting', 'good morning!!');
  socket.on('graphql:subscription', request => {
    const {query, variables} = request;
    console.log('subscribe mode start...')
  })
});

