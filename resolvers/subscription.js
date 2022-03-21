const _ = require('lodash');

module.exports = (pubsub) => {
    return { 
        sessionFavorited: {
            subscribe: (parent, args, context, info) => {
                return pubsub.asyncIterator(['SESSION_FAVORITED'])  
            }      
        },
    }
}