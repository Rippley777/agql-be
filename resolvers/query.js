module.exports = {
    sessions: (parent, args, context, info) => {
        return context.dataSources.SessionApi.getSessions(args);
    },
    sessionById: (parent, { id }, context, info) => {
       return context.dataSources.SessionApi.getSessionById(id);
    },
    speakers: (parent, args, context, info) => {
        return context.dataSources.SpeakerApi.getSpeakers();
    },
    speakerById: (parent, { id }, context, info) => {
       return context.dataSources.SpeakerApi.getSpeakerById(id);
    },
}