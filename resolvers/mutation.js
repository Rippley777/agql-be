module.exports = (pubsub) => {
    return {
        toggleFavoriteSession: (parent, args, context, info) => {
            const session = context.dataSources.SessionApi.getSessionById(args.id)
            pubsub.publish('SESSION_FAVORITED', { sessionFavorited: session });
            return context.dataSources.SessionApi.toggleFavoriteSession(args.id);
        },
        addNewSession: (parent, { session }, context, info) => {
            return context.dataSources.SessionApi.addSession(session);
        },
    }
}