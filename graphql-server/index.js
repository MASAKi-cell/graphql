const { ApolloServer, PubSub } = require('apollo-server');
const db = require('./db');
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation');
const Subscription = require('./resolver/Subscription');
const typeDefs = require('./schema');

// Subscriptionを利用するために、PubSubインスタンスを生成
const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolver: {
        Query,
        Mutation,
        Subscription,
    },
    context: {
        db,
        pubSub,
    },
});

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server read at ${url}`),
    console.log(`Subscriptions read at ${subscriptionsUrl}`)
});