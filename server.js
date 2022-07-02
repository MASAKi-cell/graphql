const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`

  input MessageInput {
    content: String
    author: String
  }

  type Message { 
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
  constructor(id, {context, author}) {
    this.id = id;
    this.context = context;
    this.author = author;
  }
}

let fakeDatebase = {};

const root = {
    hello: () => {
        return 'Hello world';
    },
    quoteOfTheDay: () => {
      return Math.random() < 0.5 ? 'Take it easy' : 'Save Something';
    },
    random: () => {
      return Math.random();
    },
    rollDice: ({numDice, numSides}) => {
      const output = [];
      for(let i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    },
    getMessage: ({id}) => {
      if(!fakeDatebase[id]) {
        throw new Error('no message exists with id' + id);
      }
      return new Message(id, fakeDatebase[id]);
    },
    createMessage: ({input}) => {
      let id = require('crypto').randomBytes(10).toString('hex');

      fakeDatebase[id] = input;
      return new Message(id, input);
    },
    updateMessage: ({id, input}) => {
      if(!fakeDatebase[id]) {
        throw new Error('no message exists with id' + id);
      }
      return new Message(id, input);
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');