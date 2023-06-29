const express = require('express')

const bodyParser = require('body-parser')
const { graphqlHTTP } = require("express-graphql")
const graphqlSchema = require('./graphql/schema.js')
const graphqlResolver = require('./graphql/resolvers.js');

const app = express()
app.use(bodyParser.json())

  
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next()
  })
  
app.use('/graphql', 
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      formatError(err) {
        if(!err.originalError){
          return err
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
      }
    }))

app.listen(8080)
