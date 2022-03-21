module.exports = (pubsub) => {
    return {
        toggleFavoriteSession: (parent, args, context, info) => {
            const session = context.dataSources.SessionApi.getSessionById(args.id)
            pubsub.publish('SESSION_FAVORITED', { sessionFavorited: session });
            console.log('fav', args)
            return context.dataSources.SessionApi.toggleFavoriteSession(args.id);
        },
        addNewSession: (parent, { session }, context, info) => {
            return context.dataSources.SessionApi.addSession(session);
        },
        // speakers: (parent, args, context, info) => {
        //     return context.dataSources.SpeakerApi.getSpeakers();
        // },
        // speakerById: (parent, { id }, context, info) => {
        //    return context.dataSources.SpeakerApi.getSpeakerById(id);
        // },
    }
}