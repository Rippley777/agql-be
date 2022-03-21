const { GraphQLUpload } = require('apollo-server');
const Mutation = require('./resolvers/mutation');
const Query = require('./resolvers/query');
const Session = require('./resolvers/session');
const Subscription = require('./resolvers/subscription');


module.exports = (pubsub) => {
    return {
        Upload: GraphQLUpload, 
        Query,
        Mutation: Mutation(pubsub),
        Session,
        Subscription: Subscription(pubsub)
    }
};