const { gql } = require('apollo-server');

module.exports = gql`
scalar Upload
type Query {
    sessions(
        id: ID,
        title: String,
        description: String,
        startsAt: String,
        endsAt: String,
        room: String,
        day: String,
        format: String,
        track: String,
        level: String
    ): [Session]
    sessionById(id: ID): Session
    speakers: [Speaker]
    speakerById(id: ID): Speaker
}
type Mutation {
    toggleFavoriteSession(id: ID): Session
    addNewSession(session: SessionInput): Session
}
type Subscription {
    sessionFavorited(sessionId: ID): Session
}
input SessionInput {
    title: String!,
    description: String,
    startsAt: String,
    endsAt: String,
    room: String,
    day: String,
    format: String,
    level: String
    favorite: Boolean
}
type Speaker {
    id: ID!
    bio: String
    name: String
    sessions: [Session]
}
type Session {
    id: ID!,
    title: String!,
    description: String,
    startsAt: String,
    endsAt: String,
    room: String,
    day: String,
    format: String,
    track: String @deprecated(reason: "too many sessions"),
    level: String
    favorite: Boolean
    speakers: [Speaker]
}`;