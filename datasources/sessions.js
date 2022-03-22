const sessions = require('../data/sessions.json');
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class SessionApi extends DataSource {
    constructor() {
        super();
    }
    initialize(config){

    }
    getSessions(args) {
        return _.filter(sessions, args);
    }
    getSessionById(id) {
        return sessions.filter(session => session.id === parseInt(id))[0];
    }
    toggleFavoriteSession(id) {
        const session = sessions.filter(session => session.id === parseInt(id))[0];
        session.favorite = !session.favorite;
        return session;
    }
    addSession(session) {
        session.id = sessions.length + 2;
        sessions.push(session);
        return session;
    }
}

module.exports = SessionApi;